const express = require('express'),
        app=express();
const bodyParser=require('body-parser');
const PORT = process.env.PORT || 8080;
const knex = require('knex')({
    client: 'postgres',
    connection: {
        host: '127.0.0.1',
		user: 'postgres',
		password: 'postgres',
		database: 'tipapp',
		charset: 'utf8'
    }
});

const bookshelf = require('bookshelf')(knex);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const Employee = bookshelf.Model.extend({
    tableName: 'employees',
    position: function(){
        // return this.hasOne(JobTitle);
        return this.belongsTo(JobTitle)
    }
    
});

const Shift = bookshelf.Model.extend({
    tableName: 'shift'

})

//--------make this doable with an input box------------
// const newEmp = new Employee({
//     name: 'Audrey Denny',
//     positions_id: 4
// })
// newEmp.save()
// .then(newEmp =>{
//     console.log(newEmp)
// })
//------------------------------------------------------

const JobTitle = bookshelf.Model.extend({
    tableName: 'positions',
    employees: function() {
        return this.hasMany(Employee);
    }
});

// const Captain = new JobTitle({
//     name: 'Captain',
//     maxPoints: 6
// })
// Captain.save()
// .then(captain =>{
//     console.log(captain)
// });

// app.get('/', (req, res)=>{
//     Employee.fetchAll()
//     .then(employees =>{
//         employees = eployees.models.map(employee =>{
//             return employee.attributes;
//         });
//         console.log(employees);
//         res.json(employees);
//     })
//     .catch(error =>{
//         console.log(error);
//     });
// });

app.get('/positions', (req, res)=>{
    JobTitle.fetchAll()
    .then(jobTitles =>{
        jobTitles = jobTitles.models.map(jobTitle =>{
            return jobTitle.attributes;
        });
        console.log(jobTitles);
        res.json(jobTitles);
    })
    .catch(err =>{
        console.log(err)
    });
});

app.get('/employees', (req, res)=>{
    Employee.fetchAll()
    .then(employees =>{
        employees = employees.models.map(employee =>{
            return employee.attributes;
        });
        console.log(employees);
        res.json(employees);
    })
    .catch(err =>{
        console.log(err)
    });
});

// app.get('/', (req, res)=>{
//     Shift.fetchAll()
//     .then(shiftData =>{
//         shiftData = shiftData.models.map(shiftData=>{
//             return shiftData.attributes;
//         });
//         console.log(shiftData)
//         res.json(shiftData);
//     })
//     .catch(err =>{
//         console.log(err)
//         res.status(500).send("no ogood");
//     })
// })

app.post('/position', (req, res)=>{
    Employee.where({id:req.body.id})
    .fetch({withRelated: 'position'})
    .then(emp=>{
        res.json(emp.related('position').attributes)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send("no ogood");
    })
})

app.delete('/clear', (req, res) =>{
    // now that we are deleting multiple shifts 
    // req.body.id is going to be an array
    // console.log(req)
    // create an array of promises to use with promise.all later
    console.log('this is line 126', req.body.id)
    let promiseArray = [];
    
    // loop over the array of ids at req.body.id
    for(let i = 0; i < req.body.id.length; i++){
        // for each of those ids do a new Shift().destory, each of those will return a promise
        
        let promise = new Shift({id: req.body.id[i].id}).destroy();
        promiseArray.push(promise)
    }

// use promise.all to wait for all of those promises to finish, and then send back a response
    Promise.all(promiseArray)
        .then((result)=>{
            console.log(result)
            res.json(result);
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send("no ogood");
        })


   new Shift ({id: req.body.id})
   .destroy()
   .then(shift =>{
       res.json(shift.attributes)
   })    
    .catch(error =>{
        console.log(error)
    })
});

app.post('/submit', (req, res) =>{
   
    
    const newEmp = new Shift({
        name: req.body.emp.name,
        position: req.body.emp.position,
        points: req.body.emp.points,
        

    })
    newEmp.save()
        .then(newEmp =>{
            res.json(newEmp.attributes)
        })
    });

app.listen(8080, ()=>{
    console.log('listening')
})
