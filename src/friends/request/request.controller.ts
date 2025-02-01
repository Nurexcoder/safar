import { Controller, Param, Post, Req } from "@nestjs/common";
import { RequestService } from "./request.service";
import { Request } from "express";
import { RequestExtented } from "src/common/types/Extended";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Request")
@Controller("request")
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @ApiOperation({ summary: "Send friend request" })
  @Post("send")
  async sendRequest(@Param("id") id: string, @Req() request: RequestExtented) {
    return this.requestService.sendRequest(id, request);
  }
}
