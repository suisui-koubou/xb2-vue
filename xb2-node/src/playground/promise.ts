const hello = () => {
	console.log('Start of JS...'); 
	
	// 如果成功就执行 resolve 函数，如果失败就执行 reject 函数
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
            resolve('🧨');
        }, 6000);// 华为的 time.sleep(6)
	}); 
}

// // Promise的使用
// hello().then(data => {
// 	console.log(data)
// })

// async的使用
const async_demo = async () => {
    const data = await hello(); 
	console.log(data); 
}; 

async_demo(); 

console.log('End of JS...'); 