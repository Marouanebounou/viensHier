const generatePdf = require("../utils/generatePdf");

const sendEmail = require("../utils/sendEmail");
const sendInvitation = async (req, res) => {
    const {fullName, email, number} = req.body;

    console.log(fullName, email, number);
    try {

        await sendEmail.personalizeAndSendInvite(fullName, email, number);

        res.status(200).json({message: "Invitation sent successfully"});
    } catch (error) {
        res.status(500).json({message: "Error sending invitation", error: error.message});
    }
}
module.exports = {sendInvitation};
