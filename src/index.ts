import { Type } from "memoryjs";
import ProcessHandler from "./ProcessHandler";

// Example:

const procHandler = new ProcessHandler("h3hota.exe");

procHandler.applyOffsetToModuleBaseAddress("hota.dll", 0x190160);

const goldAddress = procHandler.applyPointersToModuleAddress("hota.dll", [
  0xb4,
]);

const goldValue = procHandler.readAddress(goldAddress, Type.INT32);

console.log({ goldValue });
