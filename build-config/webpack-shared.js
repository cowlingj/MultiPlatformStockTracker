const path = require('path')

module.exports.rules = {
  typescriptFor(envName) {
      return { 
          test: /\.tsx?$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        envName: envName
                    }
                },
              {
                loader: "ts-loader",
                options: {
                  configFile: path.resolve(__dirname, "tsconfig.json"),
                },
              }
          ],
          include: [ /src/ ]
        }
    },
  javascriptFor(envName) {
      return {
        test: /\.js$/,
        include: [ /src/ ],
        use: [
          {
            loader: 'babel-loader',
            options: {
                envName: envName
            }
          }
        ]  
      }
  }
}

const extensionsEndings = [ '.json', '.tsx', '.ts', 'jsx', '.js' ]
module.exports.extensionsFor = function(qualifiers) {
    return [].concat(...qualifiers.map( qual => {
        return extensionsEndings.map (ext => {
            return qual + ext
        })
    }))
}