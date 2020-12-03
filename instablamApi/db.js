const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('photos.json');
const db = low(adapter);

//DB operations
//To retrive all items from gallery on data key
module.exports.getDbData = (dataKey) => {
    let data = db.get(dataKey).value();
    if(data != 'undefined' && data != null && data != '') {
        return data;
    } 
}

//To retrive the photos details from DB
module.exports.getData = (datakey, id) => {
    // Searching photos for the id
    return db.get(datakey).find({ id: id }).value();
  }

  //To add the photos to the gallery
  module.exports.addData = (dataKey, bean) => {

    db.get(dataKey).push(bean).write();
  }
//To remove the photos from the gallery
  module.exports.removeBean = (dataKey, bean) => {

    db.get(dataKey).remove(bean).write();
  }

  