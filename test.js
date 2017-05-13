var nodeLIRC = require('node-lirc');
nodeLIRC.init();

nodeLIRC.on('stdout', function(event) {
    console.log(event.instructions);


    if (event.eventName == 'EVENT_BUTTON_NAME')
        nodeLIRC.writeLine('VOLUME_UP');

});

nodeLIRC.on('stderr', function(data) {
    console.log('irrecord output stderr: ' + data.toString());
});

nodeLIRC.on('exit', function(code) {
    console.log('irrecord exited with code ' + (code?code.toString():'(unknown)'));
});

nodeLIRC.on('remote-config-ready', function(remoteConfig) {
    console.log(remoteConfig.name + " remote is READY.");
    console.log("Configuration file data:\n" + remoteConfig.configuration);
    // Insert or Update the new remote configuration into lirc config file
    nodeLIRC.upsertRemote(remoteConfig.name, remoteConfig.configuration, (error) => {
        if (!error)
            nodeLIRC.reloadData();
    });
});

// Start the remote control recording process
nodeLIRC.record('MY_NEW_REMOTE_TEST);
