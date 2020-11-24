const skdn = function(positions) {
  //СКДН по названиям (a, СТРОКА ПОИСКА, ПОЗИЦИЯ ПО АЛФАВИТУ)
  function listCheck(a) {

    a = check(a, "Том ям", "а");
    a = check(a, "Соус ", "г");
    a = check(a, "Кетчуп", "г");
    a = check(a, "картоф", "е");
    a = check(a, "наггетс", "е");
    a = check(a, "пельмен", "е");
    a = check(a, "баскет", "е");
    a = check(a, "крыл", "е");
    a = check(a, "чикен фри", "е");
    a = check(a, "кольца", "е");
    a = check(a, "ролл", "д");
    a = check(a, "бургер", "д");
    a = check(a, "спайси", "д");
    a = check(a, "Мистер ", "д");
    a = check(a, "донна", "д");
    a = check(a, "граф", "д");
    a = check(a, "мадам", "д");
    a = check(a, "пицца", "д");
    a = check(a, "чизкейк", "ж");
    a = check(a, "маффин", "ж");
    a = check(a, "пирожок", "ж");
    a = check(a, "любимый", "б");
    a = check(a, "бутылк", "б");
    a = check(a, "lipton", "б");
    a = check(a, "Minerale", "б");
    a = check(a, "Балтика", "б");
    return a;
  }
  //СКДН по РОДИТЕЛЮ (a, СТРОКА ПОИСКА, ПОЗИЦИЯ ПО АЛФАВИТУ) - в приоритете
  function listCheckParent(a) {

    a = checkParent(a, "Большие порции", "е");
    a = checkParent(a, "Пиво", "в");
    a = checkParent(a, "2. Картофель и наггетсы", "е");
    a = checkParent(a, "3. Соусы", "г");
    a = checkParent(a, "4. Горячие напитки", "а");
    a = checkParent(a, "5. Холодные напитки", "б");
    a = checkParent(a, "7. Дессерты", "ж");
    a = checkParent(a, "6. Салаты", "д");
    a = checkParent(a, "1. Сэндвичи", "д");

    a = checkParent(a, "соусы", "г");
    a = checkParent(a, "закуски", "е");
    a = checkParent(a, "холодные", "б");
    a = checkParent(a, "горячие", "а");
    a = checkParent(a, "сэндвичи", "д");
    a = checkParent(a, "роллы", "д");
    a = checkParent(a, "десерты", "ж");
    a = checkParent(a, "пицца", "д");
    a = checkParent(a, "топпинги", "з");
    a = checkParent(a, "сиропы", "з");
    a = checkParent(a, "салаты", "д");
    a = checkParent(a, "пиво", "б");
    return a;
  }

  function check(a, str, skdnnum) {
    if (a && !a.parent) {
      const string = a.name.toUpperCase();
      str = str.toUpperCase();
      if (~string.indexOf(str)) {
        a.parent = skdnnum;
      }
    } else if (a && a.parent && a.parent.length > 1) {
      const string = String(a.parent).toUpperCase();
      str = str.toUpperCase();
      if (~string.indexOf(str)) {
        a.parent = skdnnum + a.parent;
      }
    }
    return a;
  }
  function checkParent(a, str, skdnnum) {
    if (a && a.parent) {
      const string = a.parent.toUpperCase();
      str = str.toUpperCase();
      if (~string.indexOf(str)) {
        a.parent = skdnnum + a.parent;
      }
    }
    return a;
  }

  function compare(a, b) {
    a = listCheck(a);
    b = listCheck(b);
    a = listCheckParent(a);
    b = listCheckParent(b);
    if(!a.parent) a.parent = "я"
    if(!b.parent) b.parent = "я"
    let compA = a.parent + a.name;
    let compB = b.parent + b.name;
    if (compA > compB) return 1; // если первое значение больше второго
    if (compA == compB) return 0; // если равны
    if (compA < compB) return -1; // если первое значение меньше второго
  }
  positions.sort(compare);
  return positions;
};

export default skdn;
