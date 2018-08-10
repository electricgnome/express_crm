$("#add_btn").on("click", function() {
    drivers += 1;

    $(
      `<li class="tab"><a href="#driver${drivers}"> driver ${drivers}</a> </li>`
    ).insertBefore("#add_li");
    $(`<div id="driver${drivers}" value='${drivers}' style='display:block'; class="active">
    <!-- driver ${drivers} Tabs-->
<h5 class="center-align">Driver ${drivers} information</h5>
<!-- <h6 class="center-align">Additional driver info</h6> -->
<div class="row">
    <div class="input-field col s6 offset-m3 m3">
        <input name="first_name${drivers}" id="first_name${drivers}" type="text" class="validate">
        <label for="first_name${drivers}">First Name</label>
    </div>

    <div class="input-field col s6  m3">
        <input name="last_name${drivers}" id="last_name${drivers}" type="text" class="validate">
        <label for="last_name${drivers}">Last Name</label>
    </div>
</div>
<div class="row">
    <div class="input-field col s12 offset-m3 m6">
        <input name="occupation${drivers}" id="occupation${drivers}" type="text">
        <label for="occupation${drivers}">Occupation</label>
    </div></div>

<div class="divider"></div>
<div class="row">
    <div class="col s6 offset-m3 m3">

        <p>
            <label>
                <input class="with-gap" name="gender${drivers}" type="radio" value="male" checked />
                <span>Male</span>
            </label>
        </p>
        <p>
            <label>
                <input class="with-gap" name="gender${drivers}" type="radio" value="female" />
                <span>Female</span>
            </label>
        </p>
    </div>
    <div class="col s6 m3">
        <p>
            <label>
                <input class="with-gap" name="marital_status${drivers}" type="radio" value="single" checked />
                <span>Single</span>
            </label>
        </p>
        <p>
            <label>
                <input class="with-gap" name="marital_status${drivers}" type="radio" value="Married" />
                <span>Married</span>
            </label>
        </p>

    </div>

</div>
<div class="divider"></div>
<div class="row">

    <div class="input-field col s6 offset-m3 m3">
        <label for="birthdate${drivers}" class>birthdate</label>
        <input name="birthdate${drivers}" id="birthdate${drivers}" type="text" class="datepicker">


    </div>

    <div class=" input-field col s6 m3">
        <select name="relation${drivers}" id='relation${drivers}'>
            <option  value="self" >Self</option>
            <option class="flow-text" value="spouse" selected>Spouse/common law</option>
            <option value="sibiling">Sibiling</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="other">Other</option>
        </select>
        <label>Relation to primary driver:</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s6 offset-m3 m3">
        <select name="id_type${drivers}" id="id_type${drivers}">
            <option value="Tx DL" selected>Tx Drivers License</option>
            <option value="Tx ID">Texas ID</option>
            <option value="Out of state">Out of state</option>
            <option value="passport">Passport</option>
            <option value="matricula">Matricula</option>
            <option value="International DL">International Drivers License</option>
            <option value="no ID">No ID</option>
        </select>
        <label>Form of ID (Choose one):</label>
    </div>
    <div class="input-field col s6 m3">
        <label for="id_number${drivers}">ID Number</label>
        <input name="id_number${drivers}" id="id_number${drivers}" type="text" class="validate counter" data-length="20">

    </div>

</div>

<h5 class="center-align">Accidents or Tickets?</h5>
<h6 class="center-align">Please be honest. Your record will be verified. You may get a disclousre discount</h6>
<br>
<br> 
<div class="row">
    <div class="col s12 offset-m3 m3">
Any accidents or tickets in the past 5 years: &nbsp;&nbsp;&nbsp;

<label>
    <input class="with-gap" name="accident_tickets_flag${drivers}" acc="${drivers}" type="radio" value="1" />
    <span>Yes</span>
</label>

<label>
    <input class="with-gap" name="accident_tickets_flag${drivers}" acc="${drivers}" type="radio" value="0" checked/>
    <span>No</span>
</label>
</div>
</div>
<div class="optional" id="accidents${drivers}">
<div class="row">
<div class="col s6 offset-m3 m3">
            <span class="tooltip"></span>
            <br>
            <span class="c1">How many tickets have you had in the past 3 years?</span>
            <span class="c2">
                <input type="number" min="0" max="4" value="0" name="tickets${drivers}">
            </span>

        </div>
    

        <div class="col s6 m3">
            <span class="tooltip"></span>
            <br>
            <span class="c1">How many accidents have you had in the past 3 years?</span>
            <span class="c2">
                <input type="number" min="0" max="4" value="0" name="accidents${drivers}">
            </span>
            <br>
            <br> were any of these accidents at fault?
            <label>
                <input class="with-gap" name="at_fault${drivers}" type="radio" value="1" />
                <span>Yes</span>
            </label>

            <label>
                <input class="with-gap" name="at_fault${drivers}" type="radio" value="0" checked/>
                <span>No</span>
            </label>
            <br>
            <br>
        </div>
    </div>

</div>
    
    </div>`).insertBefore("#add_div");