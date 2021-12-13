import * as React from 'react';
import { Portal } from 'react-portal';
import BackgroundLayer from '../../components/BackgroundLayer/BackgroundLayer';

interface ModalProps {
    initialModalRoot?: HTMLElement | null;
}

export default class Modal extends React.Component<ModalProps> {
    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    render() {
        return (
            <Portal node={this.props.initialModalRoot}>
                <BackgroundLayer>{this.props.children}</BackgroundLayer>,
            </Portal>
        );
    }
}