module.exports = data => {
    return`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Univ of Fullstack</title>
        <link rel="stylesheet" href="/styles.css"/>
    </head>
    <body>
        <h1>Univ of Fullstack</h1>
        <div class = "table">
            <table id="schools">
                <tr>
                    <th>ID</th>
                    <th>School Names</th>
                </tr>
                <tr>
                    ${data.map((obj) => {
                        return `
                        <tr>
                            <td>${obj.id}</td>
                            <td><a href="/schools/${obj.id}">${obj.name}</a></td>
                        </tr>
                        `
                    }).join('')}
                </tr>
            </table>
        </div>
        <div>
            <h2>Register a New Student<h2>
            <form method='POST'>
                    <input type='text' name='firstName' placeholder='First Name'/>
                    <input type='text' name='lastName' placeholder='Last Name'/>
                    <select name='department'>
                        <option value=1>School of Art</option>
                        <option value=2>School of Science</option>
                        <option value=3>School of Mathmetics</option>
                        <option value=4>School of Engineering</option>
                        <option value=5>School of Finance</option>
                    </select>
                    <button>Register</button>
            </form>
        </div>
    </body>
    </html>
`};