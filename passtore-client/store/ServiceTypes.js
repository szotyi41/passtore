export default {
    htaccess: {
        name: 'htaccess',
        fields: [
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    }, 
    ssh: {
        name: 'ssh',
        fields: [
            { name: 'command', label: 'Command', type: 'command' },
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },

    // Databases
    mysql: {
        name: 'mysql',
        fields: [
            { name: 'command', label: 'Command', type: 'command' },
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'database', label: 'Database', type: 'text' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    }, 
    mongodb: {
        name: 'mongodb',
        fields: [
            { name: 'command', label: 'Command', type: 'command' },
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'database', label: 'Database', type: 'text' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },
    redis: {
        name: 'redis',
        fields: [
            { name: 'command', label: 'Command', type: 'command' },
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'auth', label: 'Auth', type: 'password' },
        ]
    },

    // Control panels
    ispconfig: {
        name: 'ispconfig',
        fields: [
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },

    // Firewalls
    pfsense: {
        name: 'pfsense',
        fields: [
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },

    // Monitoring
    nagios: {
        name: 'nagios',
        fields: [
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },
    munin: {
        name: 'munin',
        fields: [
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' }
        ]
    },

    // Storage
    ftp: {
        name: 'ftp',
        fields: [
            { name: 'command', label: 'Command', type: 'command' },
            { name: 'host', label: 'Host', type: 'text' },
            { name: 'port', label: 'Port', type: 'number' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'passive', label: 'Passive', type: 'checkbox' }
        ]
    },
    aws: {
        name: 'aws',
        fields: [
            { name: 'command', label: 'Url', type: 'command' },
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'bucket', label: 'Bucket', type: 'text' },
            { name: 'access', label: 'Access key', type: 'text' },
            { name: 'secret', label: 'Secret key', type: 'text' },
            { name: 'region', label: 'Region', type: 'text' }
        ]
    },
    azure: {
        name: 'azure',
        fields: [
            { name: 'username', label: 'Username', type: 'username' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'name', label: 'Storage Name', type: 'text' },
            { name: 'key', label: 'Storage Key', type: 'text' },
            { name: 'container', label: 'Storage Container', type: 'text' }
        ]
    },

    // VPN
    vpn: {
        name: 'vpn',
        fields: []
    }
    
}