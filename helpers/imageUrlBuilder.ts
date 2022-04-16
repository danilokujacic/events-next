const URLBuilder = (url: string) => {
    if(url.includes('http') || url.includes('https')){
        return url;
    }

    return process.env.NEXT_PUBLIC_STRAPI_HOST + url;
}
export default URLBuilder;
