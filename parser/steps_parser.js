const fs = require('fs');

function parseVitaldata(group) {
    const path_to_data = `/Users/alex/5. Semester/MedInfo2/UE4/log-parser/raw_data/${group}.txt`

    var raw_data = fs.readFileSync(path_to_data, 'utf-8')
    var lines = raw_data.split(/\r?\n/)

    const header = lines[0].split(/\t/)
    var data = []

    for (var i = 1; i < lines.length; i++) {
        data.push(lines[i].split(/\t/))
    }

    var result = []

    data.forEach(line => {
        var day_steps = []
        for(var i = 1; i< line.length; i++){
            day_steps.push(line[i])
        }
        result.push({
            GUID: line[0],
            steps: day_steps
        })
    })

    var my_json = JSON.stringify(result)
    fs.writeFileSync(`/Users/alex/5. Semester/MedInfo2/UE4/log-parser/parsed_data/${group}.json`, my_json)
}

parseVitaldata('Schritte')
