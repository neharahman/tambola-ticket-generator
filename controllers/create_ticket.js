const userModel = require('../models/userModel.js');
const tambolaModel = require('../models/tambolaModel.js');
const {verifyToken} = require('../other/jwtToken.js');

module.exports.createTambolaTicket = async (req,res) =>{
    let {authorization} = req.headers
    let {NumbersOfTickets} = req.body
    console.log('inside create tambola ticket',NumbersOfTickets)
    let jwt =await verifyToken(authorization)
    console.log(jwt)

    let arrayOfTickets=[]
    for(let i=1;i<=NumbersOfTickets;i++){
        let obj={}
        console.log(i)
        let generatedTickets = await generateTicketFun(i)
        obj[`user_id`]=jwt.id
        obj[`name`]=`ticket${i}`
        obj[`tickets`]=generatedTickets
        arrayOfTickets.push(obj)
    }
    console.log(arrayOfTickets)
    let newTambolaModel = await tambolaModel.insertMany(arrayOfTickets)
    
    res.send(newTambolaModel)
}
let from1to90 = new Set()
async function generateTicketFun(index){
    let arr=[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    let row=3
    let column=9
    for(let i=0;i<row;i++){
        // arr[i]=[]
        let set = new Set()
        for(let j=0;j<column;j++){
            while(set.size <5){
                let random =await Math.floor(Math.random() * (9 - 0 + 1)+ 0)
                if(!set.has(random)){
                    let min = (random*10)+1
                    let max = ((random+1)*10) -1
                    if(random == 8){
                        min = random * 10
                        max = ((random+1)*10)
                    }
                    let currNumber =await Math.round( Math.random() * (max - min + 1) + min)
                    if(currNumber>=1 && currNumber<=90){
                        console.log(currNumber,from1to90.size)
                        if(!from1to90.has(currNumber)){
                            arr[i][random] = currNumber
                            from1to90.add(currNumber)
                            set.add(random)
                        }
                        else{
                            if(from1to90.size >=86){
                                from1to90.clear()
                            }
                        }
                    }
                    
                }
            }
        }
        
    }
    return arr
}