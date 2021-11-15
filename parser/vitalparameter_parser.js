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
    var vital_data = ''
    var unit = ''

    data.forEach(line => {
        vital_data = line[2].replace(/\"/g, '').split(';')
        unit = line[3].replace(/\"/g, '').split(';')
        result.push({
            GUID: line[0],
            timestamp: line[1],
            value: vital_data,
            unit: unit
        })
    })

    var my_json = JSON.stringify(result)
    fs.writeFileSync(`/Users/alex/5. Semester/MedInfo2/UE4/log-parser/src/parsed_data/${group}.json`, my_json)
}

const groups = ['Blutdruck', 'Gewicht', 'Blutzucker']

groups.forEach(group => {
    parseVitaldata(group)
})