export default {

    exportFTP: (server, service) => {
        const content = `<?xml version="1.0" encoding="UTF-8"?>
        <FileZilla3 version="3.36.0" platform="mac">
            <Servers>
                <Server>
                    <Host>${service.host}</Host>
                    <Port>${service.port}</Port>
                    <Protocol>0</Protocol>
                    <Type>0</Type>
                    <User>${service.username}</User>
                    <Pass encoding="base64">${btoa(service.password)}</Pass>
                    <Logontype>1</Logontype>
                    <TimezoneOffset>0</TimezoneOffset>
                    <PasvMode>MODE_PASSIVE</PasvMode>
                    <MaximumMultipleConnections>0</MaximumMultipleConnections>
                    <EncodingType>Auto</EncodingType>
                    <BypassProxy>0</BypassProxy>
                    <Name>${server.name} - ${service.name}</Name>
                    <Comments>${service.comment}</Comments>
                    <Colour>3</Colour>
                    <LocalDir />
                    <RemoteDir />
                    <SyncBrowsing>0</SyncBrowsing>
                    <DirectoryComparison>0</DirectoryComparison>
                </Server>
            </Servers>
        </FileZilla3>`

        saveFile(server.name + '-' + service.name + '.xml', content)
    },

    saveFile: (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}