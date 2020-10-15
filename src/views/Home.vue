<template>
  <div>
    <div class="page-title">
      <h3>Смена</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">План по ТО</span>

            <p class="currency-line">
              <span>2 000 000</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Текущие показатели</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Ресторан</th>
                  <th>Чеков</th>
                  <th>Товарооборот</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>РБ0</td>
                  <td> 0 чеков</td>
                  <td> 0 руб</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped></style>
