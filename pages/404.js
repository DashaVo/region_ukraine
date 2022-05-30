import Image from 'next/image';
import Layout from '/components/Layout';
import meme from '/public/images/bilgolod.png'

export default function Custom404() {
    return(
        <Layout>
            <h1>404 - Page Not Found(<br/> Look a meme</h1>
            <Image
                src={meme}
                height={544}
                width={544}
                alt="meme"
            />
        </Layout>

);
}
