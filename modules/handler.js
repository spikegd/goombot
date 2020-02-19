const fs = require('fs')

module.exports.load = (client) => {
    fs.readdir("./commands/", (err, files) => {
        if (err) throw err
        var commands = files.filter(f => f.endsWith("js"))
      
        commands.forEach(command => {
            console.log(`Loading ${command}`)
      
            let props = require(`../commands/${command}`)
            client.commands.set(command.replace('.js', ''), props);
        })
    })
}

module.exports.handle = (client, message, prefix) => {
    var command = message.content.split(prefix)[1].split(" ")[0],
        args = message.content.split(' '),
        cmd = client.commands.get(command)

    if (cmd) cmd.run(client, message, args)
}