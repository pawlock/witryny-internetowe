const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()
prisma.$connect()
prisma.$disconnect()

module.exports = {
  async getRecords(req) {
    const query = {}
  
    if (req.where) query.where = req.where;
    if (req.include) query.include = req.include;
    if (req.select) query.select = req.select;
    if (req.take) query.take = req.take;
  
    return await prisma[req.table].findMany(query);
  },
  async upsertSingleRecord(table, record){
    try {
      await prisma[table].upsert({ 
        where: record.Id || 0,
        create: record,
        update: record
      }) 
      return true
    } catch(e) { return false }
  },
  async upsertRecords(table, data) {
    try {
      await prisma.$transaction(() => {
        data.map(async record => {
          await prisma[table].upsert({
            where: { Id: record.Id || 0 },
            create: record,
            update: record
          })
        })
      })
      return true;
    } catch (e) { return false }
  },
  async updateSingleRecord(table, record){
    try {
    const whereClause = {}
      await prisma[table].upsert({ 
        where: record.params.id || 0,
        create: record,
        update: record
      }) 
      return true
    } catch(e) {return false }
  },
  async deleteSingleRecord(table, id){
    try{
      await prisma[table].delete({
        where: { Id: id }
      })
      return true
    } catch(e) { return false }
  }
}