const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config);

class DalleController {
    static async createImage (req, res, next) {
        try {
            const { prompt } = req.body;

            const response = await openai.createImage({
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'b64_json'
            });

            const image = response.data.data[0].b64_json;

            res.status(200).json({ photo: image })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = DalleController;