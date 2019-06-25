import lib from './index';

lib()
    .then(secret => {
        if (secret) {
            process.stdout.write(JSON.stringify(secret));
        }
        process.exit(0);
    })
    .catch(error => {
        process.stderr.write(error.stack);
        process.exit(1);
    });
