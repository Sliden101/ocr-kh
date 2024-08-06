import { APIhandler } from "~/utils/types";
import { createWorker, createScheduler } from "tesseract.js";
import ErrorBuilder from "~/utils/errors";
import APIerror from "~/utils/APIerror";
import logger from "~/utils/logger";
import { string } from "joi";

const scheduler = createScheduler();

// Creates worker and adds to scheduler
const workerGen = async () => {
    const worker = await createWorker('khm', 1, {
        logger: m => console.log(m),
        cachePath: "."
      });
    scheduler.addWorker(worker);
}

export const handler: APIhandler = async (req, res, throwerr) => {
    const image = req.body.base64Image;
    async function ocr(image: string, workerN: any){
        const resArr = Array(workerN);
        for (let i=0; i<workerN; i++) {
            resArr[i] = await workerGen();
        }
        await Promise.all(resArr);

        const { data: { text } } = await scheduler.addJob('recognize', image);

        await scheduler.terminate(); // It also terminates all workers.
        return text
    }
    try {
        let result = await ocr(image, 4)
        logger.info("OCR", result);
        res.status(200).json({
            text: result,
        });    
    } catch( e:any ) {
        res.status(500).json(
            new APIerror(
                new ErrorBuilder()
                    .setStatus(500)
                    .setCode("UNKNOWN_ERROR")
                    .setMessage(e.toString())
                    .build()
            )
        );
    }
};
