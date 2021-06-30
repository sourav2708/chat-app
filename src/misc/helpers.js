 export function getNameInitials(name) {
 const splitNmae = name.toUpperCase().split(' ');

  if(splitNmae.length > 1) {
      return splitNmae[0][0] + splitNmae[1][0];
  }

  return splitNmae[0][0];
}

export function transformToArr(snapVal) {
     return snapVal ? Object.keys(snapVal) : [];
}

export function transformToArrWithId(snapVal) {
  return snapVal
   ? Object.keys(snapVal).map(roomId => {
       return {...snapVal[roomId], id: roomId};
  }) : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
   const updates = {};

   updates[`/profiles/${userId}/${keyToUpdate}`] = value;

   const getMsgs = db
        .ref('/messages')
        .orderByChild('author/uid')
        .equalTo(userId)
        .once('value');

   const getRooms = db
         .ref('/rooms')
         .orderByChild('lastMessage/author/uid')
         .equalTo(userId)
         .once('value');

   const [mSnap, rSnap] = await Promise.all([getMsgs,getRooms]);


   mSnap.forEach(msgSnap => {
       updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
   })

   rSnap.forEach(roomSnap => {
     updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
   });

   return updates;
}

export function groupBy(array, groupingKeyFn) {
    return array.reduce((result, item) => {
       const groupingKey = groupingKeyFn(item);

       if (!result[groupingKey]) {
         result[groupingKey] = [];
       }

       result[groupingKey].push(item);

       return result;
    },[]);
}