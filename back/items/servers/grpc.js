import servers from 'addon-servers';

servers.grpc.Item({
    port: 50100,
    onStart: () =>
    {
        console.log('OneType - Forge gRPC server running on :50100.');
    },
    onError: (message) =>
    {
        console.log('OneType - Forge gRPC server error: ' + message);
    },
    onStreamConnect: (stream) =>
    {
        console.log('OneType - Forge gRPC stream connected: ' + stream.id);
    },
    onStreamData: (stream, payload) =>
    {
        console.log('OneType - Forge gRPC stream data: ' + JSON.stringify(payload));

        stream.respond({ echo: payload.data }, 'Test echo from the server.', 200, true, payload.id);
    },
    onStreamError: (stream) =>
    {
    },
    onStreamEnd: (stream) =>
    {
    }
});
