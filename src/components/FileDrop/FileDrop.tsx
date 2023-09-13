import PropTypes from "prop-types";
import React, {
    DragEvent as ReactDragEvent,
    DragEventHandler as ReactDragEventHandler,
    ReactEventHandler,
} from "react";

export type DropEffects = "copy" | "move" | "link" | "none";

export interface FileDropProps {
    children: React.ReactNode;
    className?: string;
    targetClassName?: string;
    draggingOverFrameClassName?: string;
    draggingOverTargetClassName?: string;
    frame?:
        | Exclude<
              HTMLElementTagNameMap[keyof HTMLElementTagNameMap],
              HTMLElement
          >
        | HTMLDocument;
    onFrameDragEnter?: (event: DragEvent) => void;
    onFrameDragLeave?: (event: DragEvent) => void;
    onFrameDrop?: (event: DragEvent) => void;
    onDragOver?: ReactDragEventHandler<HTMLDivElement>;
    onDragLeave?: ReactDragEventHandler<HTMLDivElement>;
    onDrop?: (
        files: FileList | null,
        event: ReactDragEvent<HTMLDivElement>
    ) => any;
    onTargetClick?: ReactEventHandler<HTMLDivElement>;
    dropEffect?: DropEffects;
}

export interface FileDropState {
    draggingOverFrame: boolean;
    draggingOverTarget: boolean;
}

export class FileDrop extends React.PureComponent<
    FileDropProps,
    FileDropState
> {
    static isIE = () =>
        typeof window !== "undefined" &&
        (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            window.navigator.appVersion.indexOf("Trident/") > 0);

    static eventHasFiles = (event: DragEvent | ReactDragEvent<HTMLElement>) => {
        let hasFiles = false;
        if (event.dataTransfer) {
            const types = event.dataTransfer.types;
            for (const keyOrIndex in types) {
                if (types[keyOrIndex] === "Files") {
                    hasFiles = true;
                    break;
                }
            }
        }
        return hasFiles;
    };

    static propTypes = {
        className: PropTypes.string,
        targetClassName: PropTypes.string,
        draggingOverFrameClassName: PropTypes.string,
        draggingOverTargetClassName: PropTypes.string,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,
        onDrop: PropTypes.func,
        onTargetClick: PropTypes.func,
        dropEffect: PropTypes.oneOf(["copy", "move", "link", "none"]),
        frame: (
            props: FileDropProps,
            propName: keyof FileDropProps,
            componentName: string
        ) => {
            const prop = props[propName];
            if (prop == null) {
                return new Error(
                    "Warning: Required prop `" +
                        propName +
                        "` was not specified in `" +
                        componentName +
                        "`"
                );
            }
            if (prop !== document && !(prop instanceof HTMLElement)) {
                return new Error(
                    "Warning: Prop `" +
                        propName +
                        "` must be one of the following: document, HTMLElement!"
                );
            }
        },
        onFrameDragEnter: PropTypes.func,
        onFrameDragLeave: PropTypes.func,
        onFrameDrop: PropTypes.func,
    };

    static defaultProps = {
        dropEffect: "copy" as DropEffects,
        frame: typeof window === "undefined" ? undefined : window.document,
        className: "file-drop",
        targetClassName: "file-drop-target",
        draggingOverFrameClassName: "file-drop-dragging-over-frame",
        draggingOverTargetClassName: "file-drop-dragging-over-target",
    };

    constructor(props: FileDropProps) {
        super(props);
        this.frameDragCounter = 0;
        this.state = { draggingOverFrame: false, draggingOverTarget: false };
    }

    componentDidMount() {
        this.startFrameListeners(this.props.frame);
        this.resetDragging();
        window.addEventListener("dragover", this.handleWindowDragOverOrDrop);
        window.addEventListener("drop", this.handleWindowDragOverOrDrop);
    }

    componentDidUpdate(prevProps: FileDropProps) {
        if (prevProps.frame !== this.props.frame) {
            this.resetDragging();
            this.stopFrameListeners(prevProps.frame);
            this.startFrameListeners(this.props.frame);
        }
    }

    componentWillUnmount() {
        this.stopFrameListeners(this.props.frame);
        window.removeEventListener("dragover", this.handleWindowDragOverOrDrop);
        window.removeEventListener("drop", this.handleWindowDragOverOrDrop);
    }

    frameDragCounter: number;

    resetDragging = () => {
        this.frameDragCounter = 0;
        this.setState({ draggingOverFrame: false, draggingOverTarget: false });
    };

    handleWindowDragOverOrDrop = (event: DragEvent) => {
        event.preventDefault();
    };

    handleFrameDrag = (event: DragEvent) => {
        if (!FileDrop.eventHasFiles(event)) return;

        this.frameDragCounter += event.type === "dragenter" ? 1 : -1;

        if (this.frameDragCounter === 1) {
            this.setState({ draggingOverFrame: true });
            if (this.props.onFrameDragEnter) this.props.onFrameDragEnter(event);
            return;
        }

        if (this.frameDragCounter === 0) {
            this.setState({ draggingOverFrame: false });
            if (this.props.onFrameDragLeave) this.props.onFrameDragLeave(event);
            return;
        }
    };

    handleFrameDrop = (event: DragEvent) => {
        if (!this.state.draggingOverTarget) {
            this.resetDragging();
            if (this.props.onFrameDrop) this.props.onFrameDrop(event);
        }
    };

    handleDragOver: ReactDragEventHandler<HTMLDivElement> = (event) => {
        if (FileDrop.eventHasFiles(event)) {
            this.setState({ draggingOverTarget: true });
            if (!FileDrop.isIE() && this.props.dropEffect)
                event.dataTransfer.dropEffect = this.props.dropEffect;
            if (this.props.onDragOver) this.props.onDragOver(event);
        }
    };

    handleDragLeave: ReactDragEventHandler<HTMLDivElement> = (event) => {
        this.setState({ draggingOverTarget: false });
        if (this.props.onDragLeave) this.props.onDragLeave(event);
    };

    handleDrop: ReactDragEventHandler<HTMLDivElement> = (event) => {
        if (this.props.onDrop && FileDrop.eventHasFiles(event)) {
            const files = event.dataTransfer ? event.dataTransfer.files : null;
            this.props.onDrop(files, event);
        }
        this.resetDragging();
    };

    handleTargetClick: ReactEventHandler<HTMLDivElement> = (event) => {
        if (this.props.onTargetClick) {
            this.props.onTargetClick(event);
        }
        this.resetDragging();
    };

    stopFrameListeners = (frame: FileDropProps["frame"]) => {
        if (frame) {
            frame.removeEventListener("dragenter", this.handleFrameDrag);
            frame.removeEventListener("dragleave", this.handleFrameDrag);
            frame.removeEventListener("drop", this.handleFrameDrop);
        }
    };

    startFrameListeners = (frame: FileDropProps["frame"]) => {
        if (frame) {
            frame.addEventListener("dragenter", this.handleFrameDrag);
            frame.addEventListener("dragleave", this.handleFrameDrag);
            frame.addEventListener("drop", this.handleFrameDrop);
        }
    };

    render() {
        const {
            children,
            className,
            targetClassName,
            draggingOverFrameClassName,
            draggingOverTargetClassName,
        } = this.props;
        const { draggingOverTarget, draggingOverFrame } = this.state;

        let fileDropTargetClassName = targetClassName;
        if (draggingOverFrame)
            fileDropTargetClassName += ` ${draggingOverFrameClassName}`;
        if (draggingOverTarget)
            fileDropTargetClassName += ` ${draggingOverTargetClassName}`;

        return (
            <div
                className={className}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
            >
                <div
                    className={fileDropTargetClassName}
                    onClick={this.handleTargetClick}
                >
                    {children}
                </div>
            </div>
        );
    }
}
