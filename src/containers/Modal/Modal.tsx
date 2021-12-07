import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BackgroundLayer from '../../components/BackgroundLayer/BackgroundLayer';

interface ModalProps {
    initialModalRootId: string
}

export default class Modal extends React.Component<ModalProps> {
    el: HTMLElement;
    modalRoot: HTMLElement;
    constructor(props: React.PropsWithChildren<ModalProps>) {
        super(props);
        this.el = document.createElement('div');
        const modalRootEl = document.getElementById(props.initialModalRootId);
        if (!modalRootEl) {
            throw new Error(`Element with id '${props.initialModalRootId}' is not found`);
        }
        this.modalRoot = modalRootEl;
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.style.overflow = 'unset';
        this.modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <BackgroundLayer>{this.props.children}</BackgroundLayer>,
            this.el);
    }
}