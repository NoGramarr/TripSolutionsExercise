<template>
  <v-container fill-height>
    <v-layout justify-center align-center style="opacity: 0.95;">
      <v-flex xs12 lg8 xl6>
        <v-card class="ma-5 pa-5">
          <v-layout row justify-center class="hidden-xs-only">
            <v-flex xs6>
              <v-slider thumb-size="50" :thumb-label="showPlane" :value="progressProc" readonly>
                 <template v-slot:thumb-label style="background-color: transparent !important;">
                   <v-icon color="white">{{planeIcon}}</v-icon>
                 </template>
              </v-slider>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout justify-center text-center row pa-5>
            <v-flex xs12 md6 lg4 px-3>
              <v-select prepend-icon="fas fa-car"
                        v-model="booking.transportationSelected"
                        :items="transportationList"
                        label="Transportation"
                        v-on:input="transportationSelected">
              </v-select>
            </v-flex>
            <v-flex xs12 md6 lg4 px-3>
              <v-select item-value="id"
                        :disabled="departureList.length == 0"
                        item-text="name"
                        prepend-icon="fa fa-map-signs"
                        v-model="booking.departureSelected"
                        :items="departureList"
                        label="Departure"
                        v-on:input="departureSelected">
              </v-select>
            </v-flex>
            <v-flex xs12 md6 lg4 px-3>
              <v-select item-value="id"
                        :disabled="destinationList.length == 0"
                        item-text="name"
                        prepend-icon="fa fa-map"
                        v-model="booking.destinationSelected"
                        :items="destinationList"
                        label="Destination/Country"
                        v-on:input="destinationSelected">
              </v-select>
            </v-flex>
            <v-flex xs12 md6 lg4 px-3>
              <v-select item-value="id"
                        :disabled="resortList.length == 0"
                        item-text="name"
                        prepend-icon="fa fa-map-marker"
                        v-model="booking.resortSelected"
                        :items="resortList"
                        label="Destination/Resort"
                        v-on:input="resortSelected">
              </v-select>
            </v-flex>
            <v-flex xs12 md6 lg4 px-3>
              <v-select item-value="id"
                        :disabled="dateList.length == 0"
                        item-text="name"
                        prepend-icon="fa fa-calendar"
                        v-model="booking.dateSelected"
                        :items="dateList"
                        label="Departure/Date"
                        v-on:input="dateSelected">
                <template v-slot:item="{item}">
                  <div style="width: 100%; text-align: center;">
                    {{item.name}}
                  </div>
                </template>
              </v-select>
            </v-flex>
            <v-flex xs12 md6 lg4 px-3>
              <v-select :disabled="durationList.length == 0"
                        prepend-icon="fa fa-calendar-times"
                        v-model="booking.durationSelected"
                        :items="durationList"
                        label="Duration">
              </v-select>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-layout v-show="canSearch" justify-center row pa-5>
              <v-btn :disabled="!canSearch" primary>Search</v-btn>
            </v-layout>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties, no-restricted-syntax, no-console */
import axios from 'axios';

export default {
  data: () => ({
    canSearch: false,
    planeIcon: 'fas fa-plane-departure',
    showPlane: false,
    progress: [false, false, false, false, false, false],
    booking: {
      transportationSelected: '',
      departureSelected: '',
      destinationSelected: '',
      resortSelected: '',
      dateSelected: '',
      durationSelected: '',
    },
    transportationList: [],
    departureList: [],
    destinationList: [],
    resortList: [],
    dateList: [],
    durationList: [],
  }),
  created() {
    axios.get('https://booking.jeresferie.dk/server/authOp.php?action=packageTransportTypes&type=package&currency=DKK')
      .then((response) => {
        this.transportationList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    transportationSelected(val) {
      this.booking.departureSelected = '';
      this.booking.destinationSelected = '';
      this.booking.resortSelected = '';
      this.booking.dateSelected = '';
      this.booking.durationSelected = '';
      this.departureList = [];
      this.destinationList = [];
      this.resortList = [];
      this.dateList = [];
      this.durationList = [];
      axios.get(`https://booking.jeresferie.dk/server/authOp.php?action=packageDeparturePoints&type=package&transport=${val}`)
        .then((response) => {
          this.departureList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    departureSelected(val) {
      if (val) {
        this.booking.destinationSelected = '';
        this.booking.resortSelected = '';
        this.booking.dateSelected = '';
        this.booking.durationSelected = '';
        this.destinationList = [];
        this.resortList = [];
        this.dateList = [];
        this.durationList = [];
        axios.get(`https://booking.jeresferie.dk/server/authOp.php?action=packageCountries&type=package&transport=${this.booking.transportationSelected}&departure=${val}&currency=DKK`)
          .then((response) => {
            this.destinationList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    destinationSelected(val) {
      if (val) {
        this.booking.resortSelected = '';
        this.booking.dateSelected = '';
        this.booking.durationSelected = '';
        this.resortList = [];
        this.dateList = [];
        this.durationList = [];
        axios.get(`https://booking.jeresferie.dk/server/authOp.php?action=packageResorts&type=package&transport=${this.booking.transportationSelected}&departure=${this.booking.departureSelected}&country=${val}&currency=DKK`)
          .then((response) => {
            this.resortList = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    resortSelected(val) {
      if (val) {
        this.booking.dateSelected = '';
        this.booking.durationSelected = '';
        this.dateList = [];
        this.durationList = [];
        axios.get(`https://booking.jeresferie.dk/server/authOp.php?action=packageDates&type=package&transport=${this.booking.transportationSelected}&departure=${this.booking.departureSelected}&destination=${val}&currency=DKK`)
          .then((response) => {
            response.data.forEach((d) => {
              let dateFormatted = new Date(d.date * 1000);
              dateFormatted = dateFormatted.toLocaleDateString();
              this.dateList.push({ id: d.date, name: dateFormatted });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    dateSelected(val) {
      if (val) {
        this.booking.durationSelected = '';
        this.durationList = [];
        axios.get(`https://booking.jeresferie.dk/server/authOp.php?action=packageDurations&type=package&transport=${this.booking.transportationSelected}&departure=${this.booking.departureSelected}&destination=${this.booking.destinationSelected}&date=${val}&currency=DKK`)
          .then((response) => {
            response.data.forEach((d) => {
              this.durationList.push(d.duration);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  computed: {
    progressProc() {
      let tot = 0;
      for (const prop in this.booking) {
        if (Object.prototype.hasOwnProperty.call(this.booking, prop)) {
          if (this.booking[prop]) {
            tot += 1;
          }
        }
      }
      if (tot > 0) {
        this.showPlane = 'always';
      } else {
        this.showPlane = false;
      }
      if (tot === 6) {
        this.showPlane = false;
        this.canSearch = true;
      } else {
        this.canSearch = false;
      }
      if (tot < 2) {
        this.planeIcon = 'fas fa-plane-departure';
      } else
      if (tot >= 2 && tot < 5) {
        this.planeIcon = 'fas fa-plane';
      } else
      if (tot >= 5) {
        this.planeIcon = 'fas fa-plane-arrival';
      }
      return tot * 100 / 6;
    },
  },
};
</script>
