import superagent from 'superagent'
import * as config from '../config.js';

export function whereToEatToday(emails, cb){
    var location = getLocation((position) => {
        var url = config.BASE + 'results?users='+emails.join(',');
        if(position !== false) {
            url += '&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&distance=0.7';
        }
        superagent.get(url)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
          if(err) {
            cb(false);
            return false;
          } else {
            cb(res.body);
            return true;
          }
        })
    });
  }

function getLocation(cb) {
    cb({
        coords: {
            latitude: '32.084824',
            longitude: '34.799720'
        }
    });
    return;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            cb(position);
        });
    } else { 
       cb(false);
    }
}

export function registerResult(emails, restId, restName, cb){
    superagent.post(config.BASE + 'users/history?users='+emails.join(',') + '&restId=' + restId + '&restName=' + restName)
        .set('Content-Type', 'application/json')
        .send()
        .end((err, res) => {
            if(err) {
                cb(false);
                return false;
            } else {
                cb(res.body);
                return true;
            }
        })
}