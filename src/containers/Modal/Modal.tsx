import * as React from 'react';
import { Portal } from 'react-portal';
import BackgroundLayer from '../../components/BackgroundLayer/BackgroundLayer';

interface ModalProps {
    initialModalRoot?: HTMLElement | null;
}

export default (props: React.PropsWithChildren<ModalProps>) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);
    return (
        <Portal node={props.initialModalRoot}>
            <BackgroundLayer>{props.children}</BackgroundLayer>,
        </Portal>
    );
}