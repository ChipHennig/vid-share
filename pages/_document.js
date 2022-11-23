import Document from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { rtlCache } from '../lib/rtl-cache';

// optional: you can provide your cache as a fist argument in createStylesServer function
const stylesServer = createStylesServer(rtlCache);

export default class _Document extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        // Add your app specific logic here

        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
            ],
        };
    }
}