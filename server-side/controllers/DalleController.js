const OpenAIApi = require('openai')

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
})

class DalleController {
    static async createImage (req, res, next) {
        try {
            const { prompt } = req.body;

            if (!prompt) {
                throw ({ name: "InputPrompt" })
            }

            const response = await openai.images.generate({
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'b64_json'
            });
            
            const image = response.data[0].b64_json;

            res.status(200).json({ photo: image })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DalleController;
