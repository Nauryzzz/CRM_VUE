<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
            <div class="card-header">
                <span class="card-title">{{'CurrencyAmountTitle'|localize}}</span>
            </div>
            <table>
                <thead>
                <tr>
                    <th>{{'Currency'|localize}}</th>
                    <th>{{'CurrencyType'|localize}}</th>
                    <th>{{'Date'|localize}}</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="curr in currencies" :key="curr">
                    <td>{{curr}}</td>
                    <td>{{rates[curr].toFixed(3)}}</td>
                    <td>{{date | date("date")}}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeCurrency",
        props: ["rates", "date"],
        data() {
            return {
                currencies: ["RUB", "USD", "EUR"]
            }
        }
    }
</script>

<style>

</style>