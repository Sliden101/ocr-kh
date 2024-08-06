import { APIhandler } from "~/utils/types";
import { createWorker, createScheduler } from "tesseract.js";
import ErrorBuilder from "~/utils/errors";
import APIerror from "~/utils/APIerror";
import logger from "~/utils/logger";

// This is the route "{prefix}/"

export const handler: APIhandler = async (req, res, throwerr) => {
    // const scheduler = createScheduler();

    // // Creates worker and adds to scheduler
    // const workerGen = async () => {
    //     const worker = await createWorker('khm', 1, {
    //         logger: m => console.log(m),
    //         cachePath: "."
    //       });
    // scheduler.addWorker(worker);
    // }

    // async function ocr(imgLink: string, workerN: any){
    //     const resArr = Array(workerN);
    //     for (let i=0; i<workerN; i++) {
    //         resArr[i] = await workerGen();
    //     }
    //     await Promise.all(resArr);

    //     const { data: { text } } = await scheduler.addJob('recognize', imgLink);
    //     console.log(text)

    //     await scheduler.terminate(); // It also terminates all workers.
    //     return text
    // }
    
    // try {
    //     let result = await ocr('https://raw.githubusercontent.com/Sliden101/bacii/master/ocrthing.jpg', 4)
    //     res.status(200).json({
    //         text: result,
    //     });    
    //     logger.info("OCR", result);
    // } catch( e:any ) {
    //     res.status(500).json(
    //         new APIerror(
    //             new ErrorBuilder()
    //                 .setStatus(500)
    //                 .setCode("UNKNOWN_ERROR")
    //                 .setMessage(e.toString())
    //                 .build()
    //         )
    //     );
        
    // }
    res.status(200).json({
        message: "Testing",
    });

};
