const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const recursive = require('recursive-readdir');

const paths = {
    root: path.resolve(__dirname, '..'),
    templates: path.resolve(__dirname, '../templates'),
    content: path.resolve(__dirname, '../content'),
    static: path.resolve(__dirname, '../static'),
    public: path.resolve(__dirname, '../public'),
};

const calculatePublicPath = (file) => {
    const slug = file.replace(new RegExp(`${paths.content}/(.+)(?:\.js|\.html)$`), '$1');
    return path.join(slug === '/' ? '' : slug, 'index.html');
};

const matilda = `
███╗   ███╗ █████╗ ████████╗██╗██╗     ██████╗  █████╗ 
████╗ ████║██╔══██╗╚══██╔══╝██║██║     ██╔══██╗██╔══██╗
██╔████╔██║███████║   ██║   ██║██║     ██║  ██║███████║
██║╚██╔╝██║██╔══██║   ██║   ██║██║     ██║  ██║██╔══██║
██║ ╚═╝ ██║██║  ██║   ██║   ██║███████╗██████╔╝██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝
`;

(async () => {
    try {

        console.log(chalk.yellow`${matilda}\n`);

        console.log(`Empty: ${chalk.magentaBright`/public`}`);
        await fs.emptyDir(paths.public);

        console.log(`Copy:  ${chalk.magentaBright`/static`} => ${chalk.magentaBright`/public`}`)
        await fs.copy(paths.static, paths.public);

        const files = await recursive(paths.content, ['.html', '.js']);

        const templates = await Promise.all([
            fs.readFile(path.join(paths.templates, 'header.html'), 'utf8'),
            fs.readFile(path.join(paths.templates, 'footer.html'), 'utf8')
        ]);

        await Promise.all(files.map(async file => {
            console.log(`Read:  ${chalk.greenBright`${file.replace(paths.root, '')}`}`);
            const content = file.endsWith('.js') ? await require(file)(file) : await fs.readFile(file, 'utf8');
            const publicPath = calculatePublicPath(file);
            fs.outputFile(path.join(paths.public, publicPath), `${templates[0]}\n${content}\n${templates[1]}`);
            console.log(`Write: ${chalk.blueBright`/public/${publicPath}`}`);
        }));

    } catch (e) {
        console.log(chalk.red`${matilda}`);
        console.error(e);
    } finally {
        console.log(chalk.bgYellow.black`\n Finished. `)
    }

})();

