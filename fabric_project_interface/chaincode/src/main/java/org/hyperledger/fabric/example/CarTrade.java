/*
Copyright IBM Corp., DTCC All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/
package org.hyperledger.fabric.example;

import java.util.ArrayList;
import java.util.List;

import com.google.protobuf.ByteString;
import io.netty.handler.ssl.OpenSsl;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.shim.ChaincodeBase;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import static java.nio.charset.StandardCharsets.UTF_8;
import com.owlike.genson.Genson;

public class CarTrade extends ChaincodeBase {

    private static Log _logger = LogFactory.getLog(CarTrade.class);

    @Override
    public Response init(ChaincodeStub stub) {
        try {
            String func = stub.getFunction();
            if (!func.equals("init")) {
                return newErrorResponse("function other than init is not supported");
            }
            return newSuccessResponse();
        } catch (Throwable e) {
            return newErrorResponse(e);
        }
    }

    @Override
    public Response invoke(ChaincodeStub stub) {
        try {
            _logger.info("Invoke java chaincode");
            String func = stub.getFunction();
            List<String> params = stub.getParameters();
            if (func.equals("registerCar")) {
                return registerCar(stub, params);
            }
            if (func.equals("sellMyCar")) {
                return sellMyCar(stub, params);
            }
            if (func.equals("buyUserCar")) {
                return buyUserCar(stub, params);
            }
            if (func.equals("changeCarOwner")) {
                return changeCarOwner(stub, params);
            }
            if (func.equals("getMyCar")) {
                return getMyCar(stub, params);
            }
            if (func.equals("getAllRegisteredCar")) {
                return getAllRegisteredCar(stub, params);
            }
            if (func.equals("getAllOrderedCar")) {
                return getAllOrderedCar(stub, params);
            }
            return newErrorResponse("Invalid invoke function name.");
        } catch (Throwable e) {
            return newErrorResponse(e);
        }
    }

    private Response registerCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response sellMyCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response buyUserCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response changeCarOwner(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response getMyCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllRegisteredCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllOrderedCar(ChaincodeStub stub, List<String> args) {

        return newSuccessResponse("invoke finished successfully");
    }
