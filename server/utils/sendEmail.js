const nodemailer = require('nodemailer');


async function sendEmailWithAttachment(email,subject,text,attachmentPath){
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
        port:Number(process.env.PORT),
        secure:Boolean(process.env.SECURE),
        Auth:{
            user:process.env.USER,
            pass:process.env.PASS,
        }
    })
    let mailOptions = {
        from: `"Viens Hairs" Email@gmail.com`,
        to: email,
        subject:subject,
        text:text,
        attachments:[
            {
                filename:'Invitation-template.pdf',
                path:attachmentPath
            },
        ],
    };
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

async function personalizeAndSendInvite(userEmail) {
    const templateBytes = fs.readFileSync('./templates/Invitation-template.pdf');
      const fontBytes = fs.readFileSync('./fonts/BukhariScript.ttf'); 
    
      const pdfDoc = await PDFDocument.load(templateBytes);
      const font = await pdfDoc.embedFont(fontBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width } = firstPage.getSize();
    
      const name = `${User.fullName}`;
      const fontSize = 24;
      const textWidth = font.widthOfTextAtSize(name, fontSize);
      const x = (width - textWidth) / 2;
      const y = 400;
    
      firstPage.drawText(name, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(202, 196, 181), 
      });
      
    const pdfBytes = await pdfDoc.save();
    const pdfPath = '.invites/personalized-invite.pdf';
    fs.writeFileSync(pdfPath, pdfBytes);


    await sendEmailWithAttachment(
        userEmail,
        "Viens Hair Salon Invitation",
        "You are cordially invited to our event",
        pdfPath
    );
}

