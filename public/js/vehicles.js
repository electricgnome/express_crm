$("#add_car_btn").on("click", function() {
    cars += 1;
    $(
      `<li class="tab"><a href="#vehicle${cars}"> vehicle ${cars}</a> </li>`
    ).insertBefore("#add_car_li");
    $(`<div id="vehicle${cars}" style='display:block'; class="active">
    <!-- vehicle ${cars} Tabs-->
      <div id="vehicle${cars}">
                <h5 class="center-align" class="fs-title">Vehicle ${cars}</h5>
                <h6 class="center-align" class="fs-subtitle">What Vehicle are we insuring today?</h6>
                <div class="row">
                    <div class="input-field col s7 offset-m3 m3">
                        <input type="text" id="vin${cars}" name="vin${cars}" placeholder="(VIN) Vehicle Identification Number"   class="counter" data-length="17" required />
                       
                    </div>
                    <div class="col s3 m3">
                        <a class="btn waves-effect waves-light" name="verify_vin" id="verify_vin${cars}" value="${cars}" >verify VIN
                        </a>
                    </div>
                  
                </div>
                <div class="row">
                    <div class="input-field col s4 offset-m1 m3">
                        <input type="text" id="year${cars}" name="year${cars}" placeholder="year" />
                    </div>
                    <div class="input-field col s4 m3 ">
                        <input type="text" id="make${cars}" name="make${cars}" placeholder="make" />
                    </div>
                    <div class="input-field col s4 m3 ">
                        <input type="text" id="model${cars}" name="model${cars}" placeholder="model" />
                    </div>
                </div>


                <div id="coverages${cars}">
                    <h5 class="center-align">Coverage</h5>
                    <h6 class="center-align">How much coverage do you want?</h6>
                    <div class="row">
                        <div class="input-field col s12 offset-m2 m6">
                            <select name="coverage${cars}" id="selects_field" value="${cars}">

                                <option value="liability" selected>Liability Only</option>
                                <option value="full_coverage">Comprihensive/Collision(Full Coverage)</option>
                            </select>
                            <label>How much coverage do you want:</label>
                        </div>

                        
                    </div>
                    <div class="optional" id="full_cover${cars}">
                         <div class="row">
                            <div class="input-field col s6 offset-m2 m2">
                                <select name="deductible${cars}" id="selects_field" value="${cars}">
                                    <option value="500">$500.00</option>
                                    <option value="1000">$1,000.00</option>
                                    <option value="0" selected>None</option>
                                </select>
                                <label>Desired Deductible:</label>
                            </div>
                        </div>

                        <div style="text-align:left">
                            <br>
                            <h5 class="center-align">Additional coverage:</h5>
                            <br>
                            <div class="row">
                            <div class="input-field col s6 offset-m2 m4">
                            <p>
                            <label>
                                <input type="checkbox" name="pip${cars}" value="1">
                                <span>Personal Injury Protection (PIP)</span>
                            </label></p>
                            <br>
                            <p>
                            <label>
                                <input type="checkbox" name="um${cars}" value="1">
                                <span>Uninsured Motorist</span>
                            </label></p>
                            </div>

                            <div class="input-field col s6 m4">
                            <p>
                            <label>
                                <input type="checkbox" name="rental${cars}" value="1">
                                <span>Rental</span>
                            </label></p>
                            <br>
                            <p>
                            <label>
                                <input type="checkbox" name="towing${cars}" value="1">
                                <span>Towing</span>
                            </label>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

                </div>
            </div>
        </div>

    </div>`).insertBefore("#add_car");