const lessonModel = require('../Model/lessonModel');


exports.addNewLesson = async (req, res, next) => {
    console.log('add new lesson - ctrl');

    console.log('add new lesson - ctrl - req.body: ',req.body);
    console.log('add new lesson - ctrl - req.file: ',req.file);



    lessonModel.insertLesson({
        title: req.body.title,
        type: req.body.type,
        level: req.body.level,
        filepath: req.file.path
    }, (err, result) => {
        if (err) {
            console.log('Error: ' + err);

            return res.json({
                message: err,
                sucess: false
            });

        } else {

            return res.json({
                message: 'Lesson successfully saved!',
                sucess: true
            });
        }
    });


}

// const fs = require('fs');
// const destinationPath = './PDF_fifles/';

    // // Read the file using fs.readFile or any other method
    // fs.readFile(req.body.filepath, (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send('Failed to read the PDF file');
    //     }

    //     // Save the file using fs.writeFile or any other method
    //     fs.writeFile(destinationPath, data, err => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).send('Failed to save the PDF file');
    //         }

    //         res.sendStatus(200);
    //     });
    // });