const Translator = require('./translator');

(async () => {
    await Translator.initialize();
    const result = await Translator.translateText('Portuguese', 'hello world');
    console.log(result);
})()