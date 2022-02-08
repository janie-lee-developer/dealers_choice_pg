module.exports = data => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Univ of Fullstack</title>
        <link rel="stylesheet" href="/styles.css"/>
    </head>
    <body>
        <h1><a href="/">Univ of Fullstack</a></h1>
        <h2>Students List: ${data[0]['name']}</h2>
        <div class = "table">
            <table id = "schools">
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Department</th>
                </tr>
                <tr>
                    ${data.map((obj) => {
                        return `
                        <tr>
                            <td>${obj.id}</td>
                            <td>${obj['first_name']}</td>
                            <td>${obj['last_name']}</td>
                            <td>${obj['department_id']}</td>
                        </tr>
                        `
                        }).join('')}
                </tr>
            </table>
        </div>
    </body>
    </html>
`;