const app = require('./app')//la aplicacion real de express
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT,()=>{
    logger.info(`Server running on port ${config.PORT}`)
})
