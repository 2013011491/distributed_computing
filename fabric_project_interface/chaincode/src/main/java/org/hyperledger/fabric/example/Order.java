package org.hyperledger.fabric.example;
 
import java.util.Objects;
 
import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonProperty;

public class Order {
	private String car_id;
	private String make;
	private String model;
	private String color;
	private String owner;
	private int price;
	private String status;

	public String getOwner() {
		return owner;
	}

	public int getPrice() {
		return price;
	}

	public String getStatus() {
		return status;
	}

	public String getCarid() {
		return car_id;
	}
	public void setStatus() {
		status="done";
	}

	public Order(String ocar_id, String omake, String omodel, String ocolor,String oowner, int oprice)
	{
		car_id=ocar_id;
		make=omake;
		model=omodel;
		color=ocolor;
		owner=oowner;
		this.price=oprice;
		status="sale";
	}
}
