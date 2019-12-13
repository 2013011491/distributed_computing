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
    private final Genson genson = new Genson();
	int car_num=0;
	int order_num=0;

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
		//args: make, model, color, owner
        String key = String.format("CAR%03d",car_num++);

        Car car = new Car(args.get(0),args.get(1),args.get(2),args.get(3));
        String carState = genson.serialize(car);
        stub.putStringState(key,carState);

        return newSuccessResponse("invoke finished successfully");
    }

    private Response sellMyCar(ChaincodeStub stub, List<String> args) {
		//args:car_id
        String carState = stub.getStringState(args.get(0));
        Car car = genson.deserialize(carState, Car.class);
        Order order = new Order(args.get(0),car.getMake(),car.getModel(),car.getColor(),car.getOwner(),10,"sale");
        String orderState = genson.serialize(order);
        String key = String.format("ORDER%03d",order_num++);
        stub.putStringState(key,orderState);

        return newSuccessResponse("invoke finished successfully");
    }

    private Response buyUserCar(ChaincodeStub stub, List<String> args) {
		//car_id,buyer
        String buyer = args.get(1);

        String carState = stub.getStringState(args.get(0));
        Car car = genson.deserialize(carState, Car.class);

        Order order=null;
        String orderKey="";
        String startKey = "ORDER0";
        String endKey = "ORDER999";

        QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
        for(KeyValue result: results) {
            order = genson.deserialize(result.getStringValue(), Order.class);
            if(order.getCarid().equals(args.get(0)) && order.getStatus().equals("sale")) {
                orderKey=result.getKey();
                break;
            }
        }
        int price = order.getPrice();
        String seller = order.getOwner();

        Order norder = new Order(order.getCarid(),order.getMake(),order.getModel(),order.getColor(),order.getOwner(),order.getPrice(),"done");
        String orderState=genson.serialize(norder);
        stub.putStringState(orderKey,orderState);

        changeCarOwner(stub,args);
		return newSuccessResponse("invoke finished successfully");
    }

    private Response changeCarOwner(ChaincodeStub stub, List<String> args) {
		//car_id,buyer
        String carState = stub.getStringState(args.get(0));
        Car car = genson.deserialize(carState, Car.class);
        String key = args.get(0);
        Car ncar = new Car(car.getMake(),car.getModel(),car.getColor(),args.get(1));
        carState = genson.serialize(ncar);
        stub.putStringState(key,carState);

        return newSuccessResponse("invoke finished successfully");
    }

    private Response getMyCar(ChaincodeStub stub, List<String> args) {
		//args:owner
        String startKey="CAR0";
        String endKey="CAR999";
        String val="";

        QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
        for(KeyValue result: results) {
            Car car  = genson.deserialize(result.getStringValue(), Car.class);
            if(car.getOwner().equals(args.get(0))) {
				String temp = genson.serialize(car);
				String key = result.getKey();
				val = val + ",{\"key\":\""+key+"\"," + temp.substring(1); 
            }
        }

        return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray()); // -> bytestring으로 val 값 return()
        //return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllRegisteredCar(ChaincodeStub stub, List<String> args) {
		String startKey="CAR0";
        String endKey="CAR999";
		String val="";

        QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
        for(KeyValue result: results) {
            Car car  = genson.deserialize(result.getStringValue(), Car.class);
        	String temp = genson.serialize(car);
			String key = result.getKey();
			val = val + ",{\"key\":\""+key+"\"," + temp.substring(1); 
		}
        return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray()); // -> bytestring으로 val 값 return()
        //return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllOrderedCar(ChaincodeStub stub, List<String> args) {
        String startKey = "ORDER0";
        String endKey = "ORDER999";
		String val="";

        QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
        for(KeyValue result: results) {
            Order order = genson.deserialize(result.getStringValue(), Order.class);
        	String temp = genson.serialize(order);
			val = val + "," + temp; 
		}

        return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray()); // -> bytestring으로 val 값 return()
		//return newSuccessResponse("invoke finished successfully");
    }

    public static void main(String[] args) {
        System.out.println("OpenSSL avaliable: " + OpenSsl.isAvailable());
        new CarTrade().start(args);
    }
}
