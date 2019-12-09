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
		String key = Integer.toString(car_num++);

		Car car = new Car(args.get(0),args.get(1),args.get(2),args.get(3));
		String carState = genson.serialize(car);
		stub.putStringState(key,carState);

        return newSuccessResponse("invoke finished successfully");
    }

    private Response sellMyCar(ChaincodeStub stub, List<String> args) {
		//args:car_id,price
		String carState = stub.getStringState(args.get(0));
		Car car = genson.deserialize(carState, Car.class);
		Order order = new Order(args.get(0),car.getMake(),car.getModel(),car.getColor(),car.getOwner(),Integer.parseInt(args.get(1)));
		String orderState = genson.serialize(order);
		String key = String.format("O%03d",order_num++);
		stub.putStringState(key,orderState);

        return newSuccessResponse("invoke finished successfully");
    }

    private Response buyUserCar(ChaincodeStub stub, List<String> args) {
		//car_id,buyer
		String buyer = args.get(1);
		String bal = stub.getStringState(args.get(1));
		int buyerbal = Integer.parseInt(bal);

		String carState = stub.getStringState(args.get(0));
		Car car = genson.deserialize(carState, Car.class);
		
		Order order=null;
		String orderKey="";
		String startKey = "O0";
		String endKey = "O999";

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
		for(KeyValue result: results) {
			order = genson.deserialize(result.getStringValue(), Order.class);
			if(order.getCarid()==args.get(0) && order.getStatus()=="sale") {
				orderKey=result.getKey();
				break;
			}
		}
		int price = order.getPrice();
		String seller = order.getOwner();
		bal = stub.getStringState(seller);
		int sellerbal = Integer.parseInt(bal);

		if(buyerbal < price) {
			throw new ChaincodeException("Not enough money!");
		}
		stub.putStringState(buyer,Integer.toString(buyerbal-price));
		stub.putStringState(seller,Integer.toString(sellerbal+price));
		changeCarOwner(stub,args);
		order.setStatus();
		String orderState=genson.serialize(order);
		stub.putStringState(orderKey,orderState);

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
		String startKey="0";
		String endKey="999";
		List<Car> cars = new ArrayList<Car>();

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
		for(KeyValue result: results) {
			Car car  = genson.deserialize(result.getStringValue(), Car.class);
			if(car.getOwner()==args.get(0)) {
				cars.add(car);
			}
		}

		Car[] response = cars.toArray(new Car[cars.size()]);


        return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllRegisteredCar(ChaincodeStub stub, List<String> args) {
		String startKey="0";
		String endKey="999";
		List<Car> cars = new ArrayList<Car>();

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
		for(KeyValue result: results) {
			Car car  = genson.deserialize(result.getStringValue(), Car.class);
			cars.add(car);
		}
		Car[] response = cars.toArray(new Car[cars.size()]);



        return newSuccessResponse("invoke finished successfully");
    }

    private Response getAllOrderedCar(ChaincodeStub stub, List<String> args) {
		String startKey = "O0";
		String endKey = "O999";
		List<Order> orders = new ArrayList<Order>();

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey,endKey);
		for(KeyValue result: results) {
			Order order = genson.deserialize(result.getStringValue(), Order.class);
			orders.add(order);
		}

		Order[] response = orders.toArray(new Order[orders.size()]);

        return newSuccessResponse("invoke finished successfully");
    }
}
