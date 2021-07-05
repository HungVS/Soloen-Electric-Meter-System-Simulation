import {C_PacketProcessor} from "./C_PacketProcessor"

export class C_DCU {
	
	private readonly packetProcessor:C_PacketProcessor

	constructor(packetProcessor:C_PacketProcessor) {
		this.packetProcessor = packetProcessor
	}

	getPacketProcessor() {
		return this.packetProcessor;
	}
}
