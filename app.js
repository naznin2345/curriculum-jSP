const express = require("express");
const app = express();
var pdf = require("html-pdf");
var options = {
    format: "A4",
};
app.use(express.json());
app.use(express.urlencoded());

const html = (Data) => {
    const filteredData = Data.filter((d) => d.Distributed);
    const totalSemester = [];
    filteredData.map((d) => {
        if (!totalSemester.map((s) => s.Semester).includes(d.Semester)) {
            totalSemester.push(d);
        }
    });
    return `
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>DemoPdf</title>

        <style>
        table {
            width: 90%;
            table-layout: fixed;
            position: relative;
            overflow: hidden;
        }
        body {
            Margin: 0 !important;
            padding: 10px;
            background-color: #FFF;
            font-family: Arial;
        }
        td {
            border-color: rgb(27, 26, 26);
            text-align: center;
            vertical-align: middle;
            overflow: auto;
            padding: 2px;
        }
        caption {
            text-align: center;
            margin-bottom: 5px;
            font-size: 160%;
            padding: 10px;
            letter-spacing: normal;
            font-weight: bold;
        }
        </style>
    </head>

    <body>

        <div>


            <br><br><br><br><br><br>
            <h1 style="text-align:center">Department of Computer Science and Engineering</h1>

            <h1 style="color:rgb(144, 144, 151);text-align:center;">


                Faculty of Modern Science
            </h1><br>


            <center>
                <img src="https://upload.wikimedia.org/wikipedia/en/0/02/Leading_University_Logo.png" alt=" Logo" />
            </center><br><br>



            <p style="text-align:center;font-size: 30px;">
                Program :&nbsp M.Sc in Computer Science and Engineering
                </>
            <p style="text-align:center;font-size: 30px;">
                Name:&nbspM.Sc in CSE(Curriculum 2022)</p>
            <p style="text-align:center;font-size: 30px;">ID:&nbsp06121032</p>
            <p style="text-align:center;font-size: 30px;"> Minimum Credits to gain Degree:&nbsp20</p>
            <p style="text-align:center;font-size: 30px;">Total Courses:&nbsp7</p>
            <p style="text-align:center;font-size: 30px;">Distributed Courses:&nbsp7</p>
            <p style="text-align:center;font-size: 30px;">Total Credits:&nbsp20</p>
            <p style="text-align:center;font-size: 30px;">Distributed Credit:&nbsp20</p>





        </div>
        <br><br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>
        <center>
            <table style="page-break-after: always;"border="1" align="center" cellspacing="0">

                <caption></br></br>
                    List Of Courses
                </caption>
                </br>


                <tr>

                    <th>SI.No</td>
                    <th>Course Code</td>
                    <th>Course Title </td>
                    <th>Credits of course</td>
                </tr>

               ${Data.map(
                   (d, i) =>
                       ` <tr>
                        <td>${i + 1}.</td>
                        <td> ${d.CourseCode} </td>
                        <td>${d.CourseTitle}</td>
                        <td> ${d.Credit} </td>
                    </tr>
                `
               )
                   .toString()
                   .split(",")
                   .join("")}


                <tr>
                    <td colspan="3" style="text-align:center;"><b>Total</b></td>
                    <td>${Data?.map((d) => (d?.Credit ? d.Credit : 0)).reduce(
                        (total, sum) => {
                            return total + sum;
                        }
                    )}</td>
                </tr>

            </table>
        </center>
        <div>
            <center>

                <table border="1" align="center" cellspacing="0" >

                    <caption></br></br>Semester Wise Courses</caption>
                    </br>
                    <tr>
                        <th>Semester</th>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>credit</th>
                    </tr>



                    <tr>

                    ${totalSemester
                        .map((d1) => d1.Semester)
                        .sort()
                        .map(
                            (d1) =>
                                `
                            <tr>
                                <td rowSpan="${
                                    filteredData.filter(
                                        (d2) => d1 === d2.Semester
                                    ).length + 1
                                }">${d1}</td>

                            ${filteredData
                                .filter((d2) => d1 === d2.Semester)
                                .map(
                                    (d2) =>
                                        `
                                <tr>
                                    <td>${d2.CourseCode}</td>
                                    <td>${d2.CourseTitle}</td>
                                    <td>${d2.Credit}</td>

                                 </tr>

                                `
                                )}
                            </tr>



                        `
                        )
                        .toString()
                        .split(",")
                        .join("")}



            <tr>
                <td colspan="3"><b>Total</b></td>
                <td>${filteredData.length}</td>
            </tr>


            </center>
        </table>
    </body>

    </html>
    `;
};

app.post("/", async (req, res) => {
    pdf.create(html(req.body), options).toFile(
        "./Curriculum.pdf",
        (err, result) => {
            if (err) {
                res.status(404).json({ message: "Failed" });
            } else {
                res.status(200).json({ message: "Successfully created" });
            }
        }
    );
});

app.listen(3030, () => {
    console.log("Server started");
});
