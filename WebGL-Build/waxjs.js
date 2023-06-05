var waxjs = (function (t) {
  var e = {};
  function r(i) {
    if (e[i]) return e[i].exports;
    var n = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  return (
    (r.m = t),
    (r.c = e),
    (r.d = function (t, e, i) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (r.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.t = function (t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (r.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          r.d(
            i,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return i;
    }),
    (r.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return r.d(e, "a", e), e;
    }),
    (r.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ""),
    r((r.s = 25))
  );
})([
  function (t, e, r) {
    "use strict";
    var i = e,
      n = r(3),
      a = r(4),
      o = r(20);
    (i.assert = a),
      (i.toArray = o.toArray),
      (i.zero2 = o.zero2),
      (i.toHex = o.toHex),
      (i.encode = o.encode),
      (i.getNAF = function (t, e, r) {
        var i = new Array(Math.max(t.bitLength(), r) + 1);
        i.fill(0);
        for (var n = 1 << (e + 1), a = t.clone(), o = 0; o < i.length; o++) {
          var s,
            f = a.andln(n - 1);
          a.isOdd()
            ? ((s = f > (n >> 1) - 1 ? (n >> 1) - f : f), a.isubn(s))
            : (s = 0),
            (i[o] = s),
            a.iushrn(1);
        }
        return i;
      }),
      (i.getJSF = function (t, e) {
        var r = [[], []];
        (t = t.clone()), (e = e.clone());
        for (var i, n = 0, a = 0; t.cmpn(-n) > 0 || e.cmpn(-a) > 0; ) {
          var o,
            s,
            f = (t.andln(3) + n) & 3,
            u = (e.andln(3) + a) & 3;
          3 === f && (f = -1),
            3 === u && (u = -1),
            (o =
              0 == (1 & f)
                ? 0
                : (3 !== (i = (t.andln(7) + n) & 7) && 5 !== i) || 2 !== u
                ? f
                : -f),
            r[0].push(o),
            (s =
              0 == (1 & u)
                ? 0
                : (3 !== (i = (e.andln(7) + a) & 7) && 5 !== i) || 2 !== f
                ? u
                : -u),
            r[1].push(s),
            2 * n === o + 1 && (n = 1 - n),
            2 * a === s + 1 && (a = 1 - a),
            t.iushrn(1),
            e.iushrn(1);
        }
        return r;
      }),
      (i.cachedProperty = function (t, e, r) {
        var i = "_" + e;
        t.prototype[e] = function () {
          return void 0 !== this[i] ? this[i] : (this[i] = r.call(this));
        };
      }),
      (i.parseBytes = function (t) {
        return "string" == typeof t ? i.toArray(t, "hex") : t;
      }),
      (i.intFromLE = function (t) {
        return new n(t, "hex", "le");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(4),
      n = r(8);
    function a(t, e) {
      return (
        55296 == (64512 & t.charCodeAt(e)) &&
        !(e < 0 || e + 1 >= t.length) &&
        56320 == (64512 & t.charCodeAt(e + 1))
      );
    }
    function o(t) {
      return (
        ((t >>> 24) |
          ((t >>> 8) & 65280) |
          ((t << 8) & 16711680) |
          ((255 & t) << 24)) >>>
        0
      );
    }
    function s(t) {
      return 1 === t.length ? "0" + t : t;
    }
    function f(t) {
      return 7 === t.length
        ? "0" + t
        : 6 === t.length
        ? "00" + t
        : 5 === t.length
        ? "000" + t
        : 4 === t.length
        ? "0000" + t
        : 3 === t.length
        ? "00000" + t
        : 2 === t.length
        ? "000000" + t
        : 1 === t.length
        ? "0000000" + t
        : t;
    }
    (e.inherits = n),
      (e.toArray = function (t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var r = [];
        if ("string" == typeof t)
          if (e) {
            if ("hex" === e)
              for (
                (t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 &&
                  (t = "0" + t),
                  n = 0;
                n < t.length;
                n += 2
              )
                r.push(parseInt(t[n] + t[n + 1], 16));
          } else
            for (var i = 0, n = 0; n < t.length; n++) {
              var o = t.charCodeAt(n);
              o < 128
                ? (r[i++] = o)
                : o < 2048
                ? ((r[i++] = (o >> 6) | 192), (r[i++] = (63 & o) | 128))
                : a(t, n)
                ? ((o =
                    65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++n))),
                  (r[i++] = (o >> 18) | 240),
                  (r[i++] = ((o >> 12) & 63) | 128),
                  (r[i++] = ((o >> 6) & 63) | 128),
                  (r[i++] = (63 & o) | 128))
                : ((r[i++] = (o >> 12) | 224),
                  (r[i++] = ((o >> 6) & 63) | 128),
                  (r[i++] = (63 & o) | 128));
            }
        else for (n = 0; n < t.length; n++) r[n] = 0 | t[n];
        return r;
      }),
      (e.toHex = function (t) {
        for (var e = "", r = 0; r < t.length; r++) e += s(t[r].toString(16));
        return e;
      }),
      (e.htonl = o),
      (e.toHex32 = function (t, e) {
        for (var r = "", i = 0; i < t.length; i++) {
          var n = t[i];
          "little" === e && (n = o(n)), (r += f(n.toString(16)));
        }
        return r;
      }),
      (e.zero2 = s),
      (e.zero8 = f),
      (e.join32 = function (t, e, r, n) {
        var a = r - e;
        i(a % 4 == 0);
        for (
          var o = new Array(a / 4), s = 0, f = e;
          s < o.length;
          s++, f += 4
        ) {
          var u;
          (u =
            "big" === n
              ? (t[f] << 24) | (t[f + 1] << 16) | (t[f + 2] << 8) | t[f + 3]
              : (t[f + 3] << 24) | (t[f + 2] << 16) | (t[f + 1] << 8) | t[f]),
            (o[s] = u >>> 0);
        }
        return o;
      }),
      (e.split32 = function (t, e) {
        for (
          var r = new Array(4 * t.length), i = 0, n = 0;
          i < t.length;
          i++, n += 4
        ) {
          var a = t[i];
          "big" === e
            ? ((r[n] = a >>> 24),
              (r[n + 1] = (a >>> 16) & 255),
              (r[n + 2] = (a >>> 8) & 255),
              (r[n + 3] = 255 & a))
            : ((r[n + 3] = a >>> 24),
              (r[n + 2] = (a >>> 16) & 255),
              (r[n + 1] = (a >>> 8) & 255),
              (r[n] = 255 & a));
        }
        return r;
      }),
      (e.rotr32 = function (t, e) {
        return (t >>> e) | (t << (32 - e));
      }),
      (e.rotl32 = function (t, e) {
        return (t << e) | (t >>> (32 - e));
      }),
      (e.sum32 = function (t, e) {
        return (t + e) >>> 0;
      }),
      (e.sum32_3 = function (t, e, r) {
        return (t + e + r) >>> 0;
      }),
      (e.sum32_4 = function (t, e, r, i) {
        return (t + e + r + i) >>> 0;
      }),
      (e.sum32_5 = function (t, e, r, i, n) {
        return (t + e + r + i + n) >>> 0;
      }),
      (e.sum64 = function (t, e, r, i) {
        var n = t[e],
          a = (i + t[e + 1]) >>> 0,
          o = (a < i ? 1 : 0) + r + n;
        (t[e] = o >>> 0), (t[e + 1] = a);
      }),
      (e.sum64_hi = function (t, e, r, i) {
        return (((e + i) >>> 0 < e ? 1 : 0) + t + r) >>> 0;
      }),
      (e.sum64_lo = function (t, e, r, i) {
        return (e + i) >>> 0;
      }),
      (e.sum64_4_hi = function (t, e, r, i, n, a, o, s) {
        var f = 0,
          u = e;
        return (
          (f += (u = (u + i) >>> 0) < e ? 1 : 0),
          (f += (u = (u + a) >>> 0) < a ? 1 : 0),
          (t + r + n + o + (f += (u = (u + s) >>> 0) < s ? 1 : 0)) >>> 0
        );
      }),
      (e.sum64_4_lo = function (t, e, r, i, n, a, o, s) {
        return (e + i + a + s) >>> 0;
      }),
      (e.sum64_5_hi = function (t, e, r, i, n, a, o, s, f, u) {
        var h = 0,
          c = e;
        return (
          (h += (c = (c + i) >>> 0) < e ? 1 : 0),
          (h += (c = (c + a) >>> 0) < a ? 1 : 0),
          (h += (c = (c + s) >>> 0) < s ? 1 : 0),
          (t + r + n + o + f + (h += (c = (c + u) >>> 0) < u ? 1 : 0)) >>> 0
        );
      }),
      (e.sum64_5_lo = function (t, e, r, i, n, a, o, s, f, u) {
        return (e + i + a + s + u) >>> 0;
      }),
      (e.rotr64_hi = function (t, e, r) {
        return ((e << (32 - r)) | (t >>> r)) >>> 0;
      }),
      (e.rotr64_lo = function (t, e, r) {
        return ((t << (32 - r)) | (e >>> r)) >>> 0;
      }),
      (e.shr64_hi = function (t, e, r) {
        return t >>> r;
      }),
      (e.shr64_lo = function (t, e, r) {
        return ((t << (32 - r)) | (e >>> r)) >>> 0;
      });
  },
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__read) ||
        function (t, e) {
          var r = "function" == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var i,
            n,
            a = r.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; )
              o.push(i.value);
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              i && !i.done && (r = a.return) && r.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          return o;
        },
      n =
        (this && this.__spreadArray) ||
        function (t, e) {
          for (var r = 0, i = e.length, n = t.length; r < i; r++, n++)
            t[n] = e[r];
          return t;
        },
      a =
        (this && this.__values) ||
        function (t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            i = 0;
          if (r) return r.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && i >= t.length && (t = void 0),
                  { value: t && t[i++], done: !t }
                );
              },
            };
          throw new TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.signatureToString =
        e.stringToSignature =
        e.privateKeyToString =
        e.privateKeyToLegacyString =
        e.stringToPrivateKey =
        e.convertLegacyPublicKeys =
        e.convertLegacyPublicKey =
        e.publicKeyToString =
        e.publicKeyToLegacyString =
        e.stringToPublicKey =
        e.signatureDataSize =
        e.privateKeyDataSize =
        e.publicKeyDataSize =
        e.KeyType =
        e.base64ToBinary =
        e.binaryToBase58 =
        e.base58ToBinary =
        e.signedBinaryToDecimal =
        e.binaryToDecimal =
        e.signedDecimalToBinary =
        e.decimalToBinary =
        e.negate =
        e.isNegative =
          void 0);
    var o = r(6),
      s = r(35).RIPEMD160.hash,
      f = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      h = (function () {
        for (var t = Array(256).fill(-1), e = 0; e < f.length; ++e)
          t[f.charCodeAt(e)] = e;
        return t;
      })(),
      c = (function () {
        for (var t = Array(256).fill(-1), e = 0; e < u.length; ++e)
          t[u.charCodeAt(e)] = e;
        return (t["=".charCodeAt(0)] = 0), t;
      })();
    e.isNegative = function (t) {
      return 0 != (128 & t[t.length - 1]);
    };
    e.negate = function (t) {
      for (var e = 1, r = 0; r < t.length; ++r) {
        var i = (255 & ~t[r]) + e;
        (t[r] = i), (e = i >> 8);
      }
    };
    e.decimalToBinary = function (t, e) {
      for (var r = new Uint8Array(t), i = 0; i < e.length; ++i) {
        var n = e.charCodeAt(i);
        if (n < "0".charCodeAt(0) || n > "9".charCodeAt(0))
          throw new Error("invalid number");
        for (var a = n - "0".charCodeAt(0), o = 0; o < t; ++o) {
          var s = 10 * r[o] + a;
          (r[o] = s), (a = s >> 8);
        }
        if (a) throw new Error("number is out of range");
      }
      return r;
    };
    e.signedDecimalToBinary = function (t, r) {
      var i = "-" === r[0];
      i && (r = r.substr(1));
      var n = e.decimalToBinary(t, r);
      if (i) {
        if ((e.negate(n), !e.isNegative(n)))
          throw new Error("number is out of range");
      } else if (e.isNegative(n)) throw new Error("number is out of range");
      return n;
    };
    e.binaryToDecimal = function (t, e) {
      void 0 === e && (e = 1);
      for (
        var r = Array(e).fill("0".charCodeAt(0)), a = t.length - 1;
        a >= 0;
        --a
      ) {
        for (var o = t[a], s = 0; s < r.length; ++s) {
          var f = ((r[s] - "0".charCodeAt(0)) << 8) + o;
          (r[s] = "0".charCodeAt(0) + (f % 10)), (o = (f / 10) | 0);
        }
        for (; o; ) r.push("0".charCodeAt(0) + (o % 10)), (o = (o / 10) | 0);
      }
      return r.reverse(), String.fromCharCode.apply(String, n([], i(r)));
    };
    e.signedBinaryToDecimal = function (t, r) {
      if ((void 0 === r && (r = 1), e.isNegative(t))) {
        var i = t.slice();
        return e.negate(i), "-" + e.binaryToDecimal(i, r);
      }
      return e.binaryToDecimal(t, r);
    };
    e.base58ToBinary = function (t, e) {
      if (!t)
        return (function (t) {
          for (var e, r, i = [], n = 0; n < t.length; ++n) {
            var o = h[t.charCodeAt(n)];
            if (o < 0) throw new Error("invalid base-58 value");
            for (var s = 0; s < i.length; ++s) {
              var f = 58 * i[s] + o;
              (i[s] = 255 & f), (o = f >> 8);
            }
            o && i.push(o);
          }
          try {
            for (var u = a(t), c = u.next(); !c.done; c = u.next()) {
              if ("1" !== c.value) break;
              i.push(0);
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              c && !c.done && (r = u.return) && r.call(u);
            } finally {
              if (e) throw e.error;
            }
          }
          return i.reverse(), new Uint8Array(i);
        })(e);
      for (var r = new Uint8Array(t), i = 0; i < e.length; ++i) {
        var n = h[e.charCodeAt(i)];
        if (n < 0) throw new Error("invalid base-58 value");
        for (var o = 0; o < t; ++o) {
          var s = 58 * r[o] + n;
          (r[o] = s), (n = s >> 8);
        }
        if (n) throw new Error("base-58 value is out of range");
      }
      return r.reverse(), r;
    };
    e.binaryToBase58 = function (t, e) {
      var r, o, s, u;
      void 0 === e && (e = 1);
      var c = [];
      try {
        for (var d = a(t), l = d.next(); !l.done; l = d.next()) {
          for (var p = l.value, b = 0; b < c.length; ++b) {
            var m = (h[c[b]] << 8) + p;
            (c[b] = f.charCodeAt(m % 58)), (p = (m / 58) | 0);
          }
          for (; p; ) c.push(f.charCodeAt(p % 58)), (p = (p / 58) | 0);
        }
      } catch (t) {
        r = { error: t };
      } finally {
        try {
          l && !l.done && (o = d.return) && o.call(d);
        } finally {
          if (r) throw r.error;
        }
      }
      try {
        for (var y = a(t), v = y.next(); !v.done; v = y.next()) {
          if (v.value) break;
          c.push("1".charCodeAt(0));
        }
      } catch (t) {
        s = { error: t };
      } finally {
        try {
          v && !v.done && (u = y.return) && u.call(y);
        } finally {
          if (s) throw s.error;
        }
      }
      return c.reverse(), String.fromCharCode.apply(String, n([], i(c)));
    };
    var d;
    (e.base64ToBinary = function (t) {
      var e = t.length;
      if ((1 == (3 & e) && "=" === t[e - 1] && (e -= 1), 0 != (3 & e)))
        throw new Error("base-64 value is not padded correctly");
      var r = e >> 2,
        i = 3 * r;
      e > 0 && "=" === t[e - 1] && ("=" === t[e - 2] ? (i -= 2) : (i -= 1));
      for (var n = new Uint8Array(i), a = 0; a < r; ++a) {
        var o = c[t.charCodeAt(4 * a + 0)],
          s = c[t.charCodeAt(4 * a + 1)],
          f = c[t.charCodeAt(4 * a + 2)],
          u = c[t.charCodeAt(4 * a + 3)];
        (n[3 * a + 0] = (o << 2) | (s >> 4)),
          3 * a + 1 < i && (n[3 * a + 1] = ((15 & s) << 4) | (f >> 2)),
          3 * a + 2 < i && (n[3 * a + 2] = ((3 & f) << 6) | u);
      }
      return n;
    }),
      (function (t) {
        (t[(t.k1 = 0)] = "k1"), (t[(t.r1 = 1)] = "r1"), (t[(t.wa = 2)] = "wa");
      })((d = e.KeyType || (e.KeyType = {}))),
      (e.publicKeyDataSize = 33),
      (e.privateKeyDataSize = 32),
      (e.signatureDataSize = 65);
    var l = function (t, e) {
        for (
          var r = new Uint8Array(t.length + e.length), i = 0;
          i < t.length;
          ++i
        )
          r[i] = t[i];
        for (i = 0; i < e.length; ++i) r[t.length + i] = e.charCodeAt(i);
        return s(r);
      },
      p = function (t, r, i, n) {
        var a = e.base58ToBinary(i ? i + 4 : 0, t),
          o = { type: r, data: new Uint8Array(a.buffer, 0, a.length - 4) },
          s = new Uint8Array(l(o.data, n));
        if (
          s[0] !== a[a.length - 4] ||
          s[1] !== a[a.length - 3] ||
          s[2] !== a[a.length - 2] ||
          s[3] !== a[a.length - 1]
        )
          throw new Error("checksum doesn't match");
        return o;
      },
      b = function (t, r, i) {
        for (
          var n = new Uint8Array(l(t.data, r)),
            a = new Uint8Array(t.data.length + 4),
            o = 0;
          o < t.data.length;
          ++o
        )
          a[o] = t.data[o];
        for (o = 0; o < 4; ++o) a[o + t.data.length] = n[o];
        return i + e.binaryToBase58(a);
      };
    e.stringToPublicKey = function (t) {
      if ("string" != typeof t)
        throw new Error("expected string containing public key");
      if ("EOS" === t.substr(0, 3)) {
        for (
          var r = e.base58ToBinary(e.publicKeyDataSize + 4, t.substr(3)),
            i = { type: d.k1, data: new Uint8Array(e.publicKeyDataSize) },
            n = 0;
          n < e.publicKeyDataSize;
          ++n
        )
          i.data[n] = r[n];
        var a = new Uint8Array(s(i.data));
        if (
          a[0] !== r[e.publicKeyDataSize] ||
          a[1] !== r[34] ||
          a[2] !== r[35] ||
          a[3] !== r[36]
        )
          throw new Error("checksum doesn't match");
        return i;
      }
      if ("PUB_K1_" === t.substr(0, 7))
        return p(t.substr(7), d.k1, e.publicKeyDataSize, "K1");
      if ("PUB_R1_" === t.substr(0, 7))
        return p(t.substr(7), d.r1, e.publicKeyDataSize, "R1");
      if ("PUB_WA_" === t.substr(0, 7)) return p(t.substr(7), d.wa, 0, "WA");
      throw new Error("unrecognized public key format");
    };
    e.publicKeyToLegacyString = function (t) {
      if (t.type === d.k1 && t.data.length === e.publicKeyDataSize)
        return b(t, "", "EOS");
      throw t.type === d.r1 || t.type === d.wa
        ? new Error("Key format not supported in legacy conversion")
        : new Error("unrecognized public key format");
    };
    e.publicKeyToString = function (t) {
      if (t.type === d.k1 && t.data.length === e.publicKeyDataSize)
        return b(t, "K1", "PUB_K1_");
      if (t.type === d.r1 && t.data.length === e.publicKeyDataSize)
        return b(t, "R1", "PUB_R1_");
      if (t.type === d.wa) return b(t, "WA", "PUB_WA_");
      throw new Error("unrecognized public key format");
    };
    e.convertLegacyPublicKey = function (t) {
      return "EOS" === t.substr(0, 3)
        ? e.publicKeyToString(e.stringToPublicKey(t))
        : t;
    };
    e.convertLegacyPublicKeys = function (t) {
      return t.map(e.convertLegacyPublicKey);
    };
    e.stringToPrivateKey = function (t) {
      if ("string" != typeof t)
        throw new Error("expected string containing private key");
      if ("PVT_R1_" === t.substr(0, 7))
        return p(t.substr(7), d.r1, e.privateKeyDataSize, "R1");
      if ("PVT_K1_" === t.substr(0, 7))
        return p(t.substr(7), d.k1, e.privateKeyDataSize, "K1");
      var r = e.base58ToBinary(e.privateKeyDataSize + 5, t),
        i = { type: d.k1, data: new Uint8Array(e.privateKeyDataSize) };
      if (128 !== r[0]) throw new Error("unrecognized private key type");
      for (var n = 0; n < e.privateKeyDataSize; ++n) i.data[n] = r[n + 1];
      return i;
    };
    e.privateKeyToLegacyString = function (t) {
      if (t.type === d.k1 && t.data.length === e.privateKeyDataSize) {
        var r = [];
        r.push(128),
          t.data.forEach(function (t) {
            return r.push(t);
          });
        for (
          var i = new Uint8Array(
              o.sha256().update(o.sha256().update(r).digest()).digest()
            ),
            n = new Uint8Array(e.privateKeyDataSize + 5),
            a = 0;
          a < r.length;
          a++
        )
          n[a] = r[a];
        for (a = 0; a < 4; a++) n[a + r.length] = i[a];
        return e.binaryToBase58(n);
      }
      throw t.type === d.r1 || t.type === d.wa
        ? new Error("Key format not supported in legacy conversion")
        : new Error("unrecognized public key format");
    };
    e.privateKeyToString = function (t) {
      if (t.type === d.r1) return b(t, "R1", "PVT_R1_");
      if (t.type === d.k1) return b(t, "K1", "PVT_K1_");
      throw new Error("unrecognized private key format");
    };
    e.stringToSignature = function (t) {
      if ("string" != typeof t)
        throw new Error("expected string containing signature");
      if ("SIG_K1_" === t.substr(0, 7))
        return p(t.substr(7), d.k1, e.signatureDataSize, "K1");
      if ("SIG_R1_" === t.substr(0, 7))
        return p(t.substr(7), d.r1, e.signatureDataSize, "R1");
      if ("SIG_WA_" === t.substr(0, 7)) return p(t.substr(7), d.wa, 0, "WA");
      throw new Error("unrecognized signature format");
    };
    e.signatureToString = function (t) {
      if (t.type === d.k1) return b(t, "K1", "SIG_K1_");
      if (t.type === d.r1) return b(t, "R1", "SIG_R1_");
      if (t.type === d.wa) return b(t, "WA", "SIG_WA_");
      throw new Error("unrecognized signature format");
    };
  },
  function (t, e, r) {
    (function (t) {
      !(function (t, e) {
        "use strict";
        function i(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function n(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function a(t, e, r) {
          if (a.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        var o;
        "object" == typeof t ? (t.exports = a) : (e.BN = a),
          (a.BN = a),
          (a.wordSize = 26);
        try {
          o =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : r(45).Buffer;
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e);
          return r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : (r - 48) & 15;
        }
        function f(t, e, r) {
          var i = s(t, r);
          return r - 1 >= e && (i |= s(t, r - 1) << 4), i;
        }
        function u(t, e, r, i) {
          for (var n = 0, a = Math.min(t.length, r), o = e; o < a; o++) {
            var s = t.charCodeAt(o) - 48;
            (n *= i), (n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s);
          }
          return n;
        }
        (a.isBN = function (t) {
          return (
            t instanceof a ||
            (null !== t &&
              "object" == typeof t &&
              t.constructor.wordSize === a.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (a.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (a.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (a.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, r)
                  : (this._parseBase(t, e, n),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (a.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (a.prototype._initArray = function (t, e, r) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var a,
              o,
              s = 0;
            if ("be" === r)
              for (n = t.length - 1, a = 0; n >= 0; n -= 3)
                (o = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[a] |= (o << s) & 67108863),
                  (this.words[a + 1] = (o >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), a++);
            else if ("le" === r)
              for (n = 0, a = 0; n < t.length; n += 3)
                (o = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[a] |= (o << s) & 67108863),
                  (this.words[a + 1] = (o >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), a++);
            return this.strip();
          }),
          (a.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var n,
              a = 0,
              o = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = f(t, e, i) << a),
                  (this.words[o] |= 67108863 & n),
                  a >= 18
                    ? ((a -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (a += 8);
            else
              for (
                i = (t.length - e) % 2 == 0 ? e + 1 : e;
                i < t.length;
                i += 2
              )
                (n = f(t, e, i) << a),
                  (this.words[o] |= 67108863 & n),
                  a >= 18
                    ? ((a -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (a += 8);
            this.strip();
          }),
          (a.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
            i--, (n = (n / e) | 0);
            for (
              var a = t.length - r,
                o = a % i,
                s = Math.min(a, a - o) + r,
                f = 0,
                h = r;
              h < s;
              h += i
            )
              (f = u(t, h, h + i, e)),
                this.imuln(n),
                this.words[0] + f < 67108864
                  ? (this.words[0] += f)
                  : this._iaddn(f);
            if (0 !== o) {
              var c = 1;
              for (f = u(t, h, t.length, e), h = 0; h < o; h++) c *= e;
              this.imuln(c),
                this.words[0] + f < 67108864
                  ? (this.words[0] += f)
                  : this._iaddn(f);
            }
            this.strip();
          }),
          (a.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (a.prototype.clone = function () {
            var t = new a(null);
            return this.copy(t), t;
          }),
          (a.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (a.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (a.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (a.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var h = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          c = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          d = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        function l(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = (t.length + e.length) | 0;
          (r.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            a = 0 | e.words[0],
            o = n * a,
            s = 67108863 & o,
            f = (o / 67108864) | 0;
          r.words[0] = s;
          for (var u = 1; u < i; u++) {
            for (
              var h = f >>> 26,
                c = 67108863 & f,
                d = Math.min(u, e.length - 1),
                l = Math.max(0, u - t.length + 1);
              l <= d;
              l++
            ) {
              var p = (u - l) | 0;
              (h +=
                ((o = (n = 0 | t.words[p]) * (a = 0 | e.words[l]) + c) /
                  67108864) |
                0),
                (c = 67108863 & o);
            }
            (r.words[u] = 0 | c), (f = 0 | h);
          }
          return 0 !== f ? (r.words[u] = 0 | f) : r.length--, r.strip();
        }
        (a.prototype.toString = function (t, e) {
          var r;
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            r = "";
            for (var n = 0, a = 0, o = 0; o < this.length; o++) {
              var s = this.words[o],
                f = (16777215 & ((s << n) | a)).toString(16);
              (r =
                0 !== (a = (s >>> (24 - n)) & 16777215) || o !== this.length - 1
                  ? h[6 - f.length] + f + r
                  : f + r),
                (n += 2) >= 26 && ((n -= 26), o--);
            }
            for (0 !== a && (r = a.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var u = c[t],
              l = d[t];
            r = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero(); ) {
              var b = p.modn(l).toString(t);
              r = (p = p.idivn(l)).isZero() ? b + r : h[u - b.length] + b + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (a.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (a.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (a.prototype.toBuffer = function (t, e) {
            return i(void 0 !== o), this.toArrayLike(o, t, e);
          }),
          (a.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (a.prototype.toArrayLike = function (t, e, r) {
            var n = this.byteLength(),
              a = r || Math.max(1, n);
            i(n <= a, "byte array longer than desired length"),
              i(a > 0, "Requested array length <= 0"),
              this.strip();
            var o,
              s,
              f = "le" === e,
              u = new t(a),
              h = this.clone();
            if (f) {
              for (s = 0; !h.isZero(); s++)
                (o = h.andln(255)), h.iushrn(8), (u[s] = o);
              for (; s < a; s++) u[s] = 0;
            } else {
              for (s = 0; s < a - n; s++) u[s] = 0;
              for (s = 0; !h.isZero(); s++)
                (o = h.andln(255)), h.iushrn(8), (u[a - s - 1] = o);
            }
            return u;
          }),
          Math.clz32
            ? (a.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (a.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (a.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            );
          }),
          (a.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (a.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (a.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (a.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (a.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (a.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (a.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (a.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (a.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this.strip();
          }),
          (a.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (a.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (a.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (a.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this.strip();
          }),
          (a.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (a.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (a.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (a.prototype.iuxor = function (t) {
            var e, r;
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
            if (this !== e)
              for (; i < e.length; i++) this.words[i] = e.words[i];
            return (this.length = e.length), this.strip();
          }),
          (a.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (a.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (a.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (a.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              r > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
              this.strip()
            );
          }),
          (a.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (a.prototype.setn = function (t, e) {
            i("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(r + 1),
              (this.words[r] = e
                ? this.words[r] | (1 << n)
                : this.words[r] & ~(1 << n)),
              this.strip()
            );
          }),
          (a.prototype.iadd = function (t) {
            var e, r, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this));
            for (var n = 0, a = 0; a < i.length; a++)
              (e = (0 | r.words[a]) + (0 | i.words[a]) + n),
                (this.words[a] = 67108863 & e),
                (n = e >>> 26);
            for (; 0 !== n && a < r.length; a++)
              (e = (0 | r.words[a]) + n),
                (this.words[a] = 67108863 & e),
                (n = e >>> 26);
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (r !== this)
              for (; a < r.length; a++) this.words[a] = r.words[a];
            return this;
          }),
          (a.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (a.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var r,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this));
            for (var a = 0, o = 0; o < i.length; o++)
              (a = (e = (0 | r.words[o]) - (0 | i.words[o]) + a) >> 26),
                (this.words[o] = 67108863 & e);
            for (; 0 !== a && o < r.length; o++)
              (a = (e = (0 | r.words[o]) + a) >> 26),
                (this.words[o] = 67108863 & e);
            if (0 === a && o < r.length && r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return (
              (this.length = Math.max(this.length, o)),
              r !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (a.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var p = function (t, e, r) {
          var i,
            n,
            a,
            o = t.words,
            s = e.words,
            f = r.words,
            u = 0,
            h = 0 | o[0],
            c = 8191 & h,
            d = h >>> 13,
            l = 0 | o[1],
            p = 8191 & l,
            b = l >>> 13,
            m = 0 | o[2],
            y = 8191 & m,
            v = m >>> 13,
            g = 0 | o[3],
            w = 8191 & g,
            _ = g >>> 13,
            M = 0 | o[4],
            A = 8191 & M,
            x = M >>> 13,
            S = 0 | o[5],
            k = 8191 & S,
            z = S >>> 13,
            E = 0 | o[6],
            T = 8191 & E,
            R = E >>> 13,
            P = 0 | o[7],
            I = 8191 & P,
            N = P >>> 13,
            U = 0 | o[8],
            B = 8191 & U,
            O = U >>> 13,
            D = 0 | o[9],
            L = 8191 & D,
            K = D >>> 13,
            C = 0 | s[0],
            j = 8191 & C,
            q = C >>> 13,
            F = 0 | s[1],
            Z = 8191 & F,
            V = F >>> 13,
            Y = 0 | s[2],
            H = 8191 & Y,
            W = Y >>> 13,
            J = 0 | s[3],
            G = 8191 & J,
            X = J >>> 13,
            Q = 0 | s[4],
            $ = 8191 & Q,
            tt = Q >>> 13,
            et = 0 | s[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | s[6],
            at = 8191 & nt,
            ot = nt >>> 13,
            st = 0 | s[7],
            ft = 8191 & st,
            ut = st >>> 13,
            ht = 0 | s[8],
            ct = 8191 & ht,
            dt = ht >>> 13,
            lt = 0 | s[9],
            pt = 8191 & lt,
            bt = lt >>> 13;
          (r.negative = t.negative ^ e.negative), (r.length = 19);
          var mt =
            (((u + (i = Math.imul(c, j))) | 0) +
              ((8191 & (n = ((n = Math.imul(c, q)) + Math.imul(d, j)) | 0)) <<
                13)) |
            0;
          (u = ((((a = Math.imul(d, q)) + (n >>> 13)) | 0) + (mt >>> 26)) | 0),
            (mt &= 67108863),
            (i = Math.imul(p, j)),
            (n = ((n = Math.imul(p, q)) + Math.imul(b, j)) | 0),
            (a = Math.imul(b, q));
          var yt =
            (((u + (i = (i + Math.imul(c, Z)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, V)) | 0) + Math.imul(d, Z)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, V)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(y, j)),
            (n = ((n = Math.imul(y, q)) + Math.imul(v, j)) | 0),
            (a = Math.imul(v, q)),
            (i = (i + Math.imul(p, Z)) | 0),
            (n = ((n = (n + Math.imul(p, V)) | 0) + Math.imul(b, Z)) | 0),
            (a = (a + Math.imul(b, V)) | 0);
          var vt =
            (((u + (i = (i + Math.imul(c, H)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, W)) | 0) + Math.imul(d, H)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, W)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(w, j)),
            (n = ((n = Math.imul(w, q)) + Math.imul(_, j)) | 0),
            (a = Math.imul(_, q)),
            (i = (i + Math.imul(y, Z)) | 0),
            (n = ((n = (n + Math.imul(y, V)) | 0) + Math.imul(v, Z)) | 0),
            (a = (a + Math.imul(v, V)) | 0),
            (i = (i + Math.imul(p, H)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(b, H)) | 0),
            (a = (a + Math.imul(b, W)) | 0);
          var gt =
            (((u + (i = (i + Math.imul(c, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, X)) | 0) + Math.imul(d, G)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, X)) | 0) + (n >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (i = Math.imul(A, j)),
            (n = ((n = Math.imul(A, q)) + Math.imul(x, j)) | 0),
            (a = Math.imul(x, q)),
            (i = (i + Math.imul(w, Z)) | 0),
            (n = ((n = (n + Math.imul(w, V)) | 0) + Math.imul(_, Z)) | 0),
            (a = (a + Math.imul(_, V)) | 0),
            (i = (i + Math.imul(y, H)) | 0),
            (n = ((n = (n + Math.imul(y, W)) | 0) + Math.imul(v, H)) | 0),
            (a = (a + Math.imul(v, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(b, G)) | 0),
            (a = (a + Math.imul(b, X)) | 0);
          var wt =
            (((u + (i = (i + Math.imul(c, $)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, tt)) | 0) + Math.imul(d, $)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, tt)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(k, j)),
            (n = ((n = Math.imul(k, q)) + Math.imul(z, j)) | 0),
            (a = Math.imul(z, q)),
            (i = (i + Math.imul(A, Z)) | 0),
            (n = ((n = (n + Math.imul(A, V)) | 0) + Math.imul(x, Z)) | 0),
            (a = (a + Math.imul(x, V)) | 0),
            (i = (i + Math.imul(w, H)) | 0),
            (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(_, H)) | 0),
            (a = (a + Math.imul(_, W)) | 0),
            (i = (i + Math.imul(y, G)) | 0),
            (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(v, G)) | 0),
            (a = (a + Math.imul(v, X)) | 0),
            (i = (i + Math.imul(p, $)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(b, $)) | 0),
            (a = (a + Math.imul(b, tt)) | 0);
          var _t =
            (((u + (i = (i + Math.imul(c, rt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, it)) | 0) + Math.imul(d, rt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, it)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(T, j)),
            (n = ((n = Math.imul(T, q)) + Math.imul(R, j)) | 0),
            (a = Math.imul(R, q)),
            (i = (i + Math.imul(k, Z)) | 0),
            (n = ((n = (n + Math.imul(k, V)) | 0) + Math.imul(z, Z)) | 0),
            (a = (a + Math.imul(z, V)) | 0),
            (i = (i + Math.imul(A, H)) | 0),
            (n = ((n = (n + Math.imul(A, W)) | 0) + Math.imul(x, H)) | 0),
            (a = (a + Math.imul(x, W)) | 0),
            (i = (i + Math.imul(w, G)) | 0),
            (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(_, G)) | 0),
            (a = (a + Math.imul(_, X)) | 0),
            (i = (i + Math.imul(y, $)) | 0),
            (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(v, $)) | 0),
            (a = (a + Math.imul(v, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(b, rt)) | 0),
            (a = (a + Math.imul(b, it)) | 0);
          var Mt =
            (((u + (i = (i + Math.imul(c, at)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, ot)) | 0) + Math.imul(d, at)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, ot)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(I, j)),
            (n = ((n = Math.imul(I, q)) + Math.imul(N, j)) | 0),
            (a = Math.imul(N, q)),
            (i = (i + Math.imul(T, Z)) | 0),
            (n = ((n = (n + Math.imul(T, V)) | 0) + Math.imul(R, Z)) | 0),
            (a = (a + Math.imul(R, V)) | 0),
            (i = (i + Math.imul(k, H)) | 0),
            (n = ((n = (n + Math.imul(k, W)) | 0) + Math.imul(z, H)) | 0),
            (a = (a + Math.imul(z, W)) | 0),
            (i = (i + Math.imul(A, G)) | 0),
            (n = ((n = (n + Math.imul(A, X)) | 0) + Math.imul(x, G)) | 0),
            (a = (a + Math.imul(x, X)) | 0),
            (i = (i + Math.imul(w, $)) | 0),
            (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(_, $)) | 0),
            (a = (a + Math.imul(_, tt)) | 0),
            (i = (i + Math.imul(y, rt)) | 0),
            (n = ((n = (n + Math.imul(y, it)) | 0) + Math.imul(v, rt)) | 0),
            (a = (a + Math.imul(v, it)) | 0),
            (i = (i + Math.imul(p, at)) | 0),
            (n = ((n = (n + Math.imul(p, ot)) | 0) + Math.imul(b, at)) | 0),
            (a = (a + Math.imul(b, ot)) | 0);
          var At =
            (((u + (i = (i + Math.imul(c, ft)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, ut)) | 0) + Math.imul(d, ft)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, ut)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(B, j)),
            (n = ((n = Math.imul(B, q)) + Math.imul(O, j)) | 0),
            (a = Math.imul(O, q)),
            (i = (i + Math.imul(I, Z)) | 0),
            (n = ((n = (n + Math.imul(I, V)) | 0) + Math.imul(N, Z)) | 0),
            (a = (a + Math.imul(N, V)) | 0),
            (i = (i + Math.imul(T, H)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(R, H)) | 0),
            (a = (a + Math.imul(R, W)) | 0),
            (i = (i + Math.imul(k, G)) | 0),
            (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(z, G)) | 0),
            (a = (a + Math.imul(z, X)) | 0),
            (i = (i + Math.imul(A, $)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(x, $)) | 0),
            (a = (a + Math.imul(x, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(_, rt)) | 0),
            (a = (a + Math.imul(_, it)) | 0),
            (i = (i + Math.imul(y, at)) | 0),
            (n = ((n = (n + Math.imul(y, ot)) | 0) + Math.imul(v, at)) | 0),
            (a = (a + Math.imul(v, ot)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(b, ft)) | 0),
            (a = (a + Math.imul(b, ut)) | 0);
          var xt =
            (((u + (i = (i + Math.imul(c, ct)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, dt)) | 0) + Math.imul(d, ct)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, dt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(L, j)),
            (n = ((n = Math.imul(L, q)) + Math.imul(K, j)) | 0),
            (a = Math.imul(K, q)),
            (i = (i + Math.imul(B, Z)) | 0),
            (n = ((n = (n + Math.imul(B, V)) | 0) + Math.imul(O, Z)) | 0),
            (a = (a + Math.imul(O, V)) | 0),
            (i = (i + Math.imul(I, H)) | 0),
            (n = ((n = (n + Math.imul(I, W)) | 0) + Math.imul(N, H)) | 0),
            (a = (a + Math.imul(N, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(R, G)) | 0),
            (a = (a + Math.imul(R, X)) | 0),
            (i = (i + Math.imul(k, $)) | 0),
            (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(z, $)) | 0),
            (a = (a + Math.imul(z, tt)) | 0),
            (i = (i + Math.imul(A, rt)) | 0),
            (n = ((n = (n + Math.imul(A, it)) | 0) + Math.imul(x, rt)) | 0),
            (a = (a + Math.imul(x, it)) | 0),
            (i = (i + Math.imul(w, at)) | 0),
            (n = ((n = (n + Math.imul(w, ot)) | 0) + Math.imul(_, at)) | 0),
            (a = (a + Math.imul(_, ot)) | 0),
            (i = (i + Math.imul(y, ft)) | 0),
            (n = ((n = (n + Math.imul(y, ut)) | 0) + Math.imul(v, ft)) | 0),
            (a = (a + Math.imul(v, ut)) | 0),
            (i = (i + Math.imul(p, ct)) | 0),
            (n = ((n = (n + Math.imul(p, dt)) | 0) + Math.imul(b, ct)) | 0),
            (a = (a + Math.imul(b, dt)) | 0);
          var St =
            (((u + (i = (i + Math.imul(c, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, bt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, bt)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(L, Z)),
            (n = ((n = Math.imul(L, V)) + Math.imul(K, Z)) | 0),
            (a = Math.imul(K, V)),
            (i = (i + Math.imul(B, H)) | 0),
            (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(O, H)) | 0),
            (a = (a + Math.imul(O, W)) | 0),
            (i = (i + Math.imul(I, G)) | 0),
            (n = ((n = (n + Math.imul(I, X)) | 0) + Math.imul(N, G)) | 0),
            (a = (a + Math.imul(N, X)) | 0),
            (i = (i + Math.imul(T, $)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(R, $)) | 0),
            (a = (a + Math.imul(R, tt)) | 0),
            (i = (i + Math.imul(k, rt)) | 0),
            (n = ((n = (n + Math.imul(k, it)) | 0) + Math.imul(z, rt)) | 0),
            (a = (a + Math.imul(z, it)) | 0),
            (i = (i + Math.imul(A, at)) | 0),
            (n = ((n = (n + Math.imul(A, ot)) | 0) + Math.imul(x, at)) | 0),
            (a = (a + Math.imul(x, ot)) | 0),
            (i = (i + Math.imul(w, ft)) | 0),
            (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(_, ft)) | 0),
            (a = (a + Math.imul(_, ut)) | 0),
            (i = (i + Math.imul(y, ct)) | 0),
            (n = ((n = (n + Math.imul(y, dt)) | 0) + Math.imul(v, ct)) | 0),
            (a = (a + Math.imul(v, dt)) | 0);
          var kt =
            (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, bt)) | 0) + Math.imul(b, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(b, bt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(L, H)),
            (n = ((n = Math.imul(L, W)) + Math.imul(K, H)) | 0),
            (a = Math.imul(K, W)),
            (i = (i + Math.imul(B, G)) | 0),
            (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(O, G)) | 0),
            (a = (a + Math.imul(O, X)) | 0),
            (i = (i + Math.imul(I, $)) | 0),
            (n = ((n = (n + Math.imul(I, tt)) | 0) + Math.imul(N, $)) | 0),
            (a = (a + Math.imul(N, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(R, rt)) | 0),
            (a = (a + Math.imul(R, it)) | 0),
            (i = (i + Math.imul(k, at)) | 0),
            (n = ((n = (n + Math.imul(k, ot)) | 0) + Math.imul(z, at)) | 0),
            (a = (a + Math.imul(z, ot)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = ((n = (n + Math.imul(A, ut)) | 0) + Math.imul(x, ft)) | 0),
            (a = (a + Math.imul(x, ut)) | 0),
            (i = (i + Math.imul(w, ct)) | 0),
            (n = ((n = (n + Math.imul(w, dt)) | 0) + Math.imul(_, ct)) | 0),
            (a = (a + Math.imul(_, dt)) | 0);
          var zt =
            (((u + (i = (i + Math.imul(y, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(y, bt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(v, bt)) | 0) + (n >>> 13)) | 0) +
              (zt >>> 26)) |
            0),
            (zt &= 67108863),
            (i = Math.imul(L, G)),
            (n = ((n = Math.imul(L, X)) + Math.imul(K, G)) | 0),
            (a = Math.imul(K, X)),
            (i = (i + Math.imul(B, $)) | 0),
            (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(O, $)) | 0),
            (a = (a + Math.imul(O, tt)) | 0),
            (i = (i + Math.imul(I, rt)) | 0),
            (n = ((n = (n + Math.imul(I, it)) | 0) + Math.imul(N, rt)) | 0),
            (a = (a + Math.imul(N, it)) | 0),
            (i = (i + Math.imul(T, at)) | 0),
            (n = ((n = (n + Math.imul(T, ot)) | 0) + Math.imul(R, at)) | 0),
            (a = (a + Math.imul(R, ot)) | 0),
            (i = (i + Math.imul(k, ft)) | 0),
            (n = ((n = (n + Math.imul(k, ut)) | 0) + Math.imul(z, ft)) | 0),
            (a = (a + Math.imul(z, ut)) | 0),
            (i = (i + Math.imul(A, ct)) | 0),
            (n = ((n = (n + Math.imul(A, dt)) | 0) + Math.imul(x, ct)) | 0),
            (a = (a + Math.imul(x, dt)) | 0);
          var Et =
            (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(w, bt)) | 0) + Math.imul(_, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(_, bt)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(L, $)),
            (n = ((n = Math.imul(L, tt)) + Math.imul(K, $)) | 0),
            (a = Math.imul(K, tt)),
            (i = (i + Math.imul(B, rt)) | 0),
            (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(O, rt)) | 0),
            (a = (a + Math.imul(O, it)) | 0),
            (i = (i + Math.imul(I, at)) | 0),
            (n = ((n = (n + Math.imul(I, ot)) | 0) + Math.imul(N, at)) | 0),
            (a = (a + Math.imul(N, ot)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(R, ft)) | 0),
            (a = (a + Math.imul(R, ut)) | 0),
            (i = (i + Math.imul(k, ct)) | 0),
            (n = ((n = (n + Math.imul(k, dt)) | 0) + Math.imul(z, ct)) | 0),
            (a = (a + Math.imul(z, dt)) | 0);
          var Tt =
            (((u + (i = (i + Math.imul(A, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, bt)) | 0) + Math.imul(x, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(x, bt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(L, rt)),
            (n = ((n = Math.imul(L, it)) + Math.imul(K, rt)) | 0),
            (a = Math.imul(K, it)),
            (i = (i + Math.imul(B, at)) | 0),
            (n = ((n = (n + Math.imul(B, ot)) | 0) + Math.imul(O, at)) | 0),
            (a = (a + Math.imul(O, ot)) | 0),
            (i = (i + Math.imul(I, ft)) | 0),
            (n = ((n = (n + Math.imul(I, ut)) | 0) + Math.imul(N, ft)) | 0),
            (a = (a + Math.imul(N, ut)) | 0),
            (i = (i + Math.imul(T, ct)) | 0),
            (n = ((n = (n + Math.imul(T, dt)) | 0) + Math.imul(R, ct)) | 0),
            (a = (a + Math.imul(R, dt)) | 0);
          var Rt =
            (((u + (i = (i + Math.imul(k, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(k, bt)) | 0) + Math.imul(z, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(z, bt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(L, at)),
            (n = ((n = Math.imul(L, ot)) + Math.imul(K, at)) | 0),
            (a = Math.imul(K, ot)),
            (i = (i + Math.imul(B, ft)) | 0),
            (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(O, ft)) | 0),
            (a = (a + Math.imul(O, ut)) | 0),
            (i = (i + Math.imul(I, ct)) | 0),
            (n = ((n = (n + Math.imul(I, dt)) | 0) + Math.imul(N, ct)) | 0),
            (a = (a + Math.imul(N, dt)) | 0);
          var Pt =
            (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, bt)) | 0) + Math.imul(R, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(R, bt)) | 0) + (n >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863),
            (i = Math.imul(L, ft)),
            (n = ((n = Math.imul(L, ut)) + Math.imul(K, ft)) | 0),
            (a = Math.imul(K, ut)),
            (i = (i + Math.imul(B, ct)) | 0),
            (n = ((n = (n + Math.imul(B, dt)) | 0) + Math.imul(O, ct)) | 0),
            (a = (a + Math.imul(O, dt)) | 0);
          var It =
            (((u + (i = (i + Math.imul(I, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(I, bt)) | 0) + Math.imul(N, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(N, bt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (i = Math.imul(L, ct)),
            (n = ((n = Math.imul(L, dt)) + Math.imul(K, ct)) | 0),
            (a = Math.imul(K, dt));
          var Nt =
            (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(B, bt)) | 0) + Math.imul(O, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(O, bt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863);
          var Ut =
            (((u + (i = Math.imul(L, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(L, bt)) + Math.imul(K, pt)) | 0)) <<
                13)) |
            0;
          return (
            (u =
              ((((a = Math.imul(K, bt)) + (n >>> 13)) | 0) + (Ut >>> 26)) | 0),
            (Ut &= 67108863),
            (f[0] = mt),
            (f[1] = yt),
            (f[2] = vt),
            (f[3] = gt),
            (f[4] = wt),
            (f[5] = _t),
            (f[6] = Mt),
            (f[7] = At),
            (f[8] = xt),
            (f[9] = St),
            (f[10] = kt),
            (f[11] = zt),
            (f[12] = Et),
            (f[13] = Tt),
            (f[14] = Rt),
            (f[15] = Pt),
            (f[16] = It),
            (f[17] = Nt),
            (f[18] = Ut),
            0 !== u && ((f[19] = u), r.length++),
            r
          );
        };
        function b(t, e, r) {
          return new m().mulp(t, e, r);
        }
        function m(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (p = l),
          (a.prototype.mulTo = function (t, e) {
            var r = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? p(this, t, e)
              : r < 63
              ? l(this, t, e)
              : r < 1024
              ? (function (t, e, r) {
                  (r.negative = e.negative ^ t.negative),
                    (r.length = t.length + e.length);
                  for (var i = 0, n = 0, a = 0; a < r.length - 1; a++) {
                    var o = n;
                    n = 0;
                    for (
                      var s = 67108863 & i,
                        f = Math.min(a, e.length - 1),
                        u = Math.max(0, a - t.length + 1);
                      u <= f;
                      u++
                    ) {
                      var h = a - u,
                        c = (0 | t.words[h]) * (0 | e.words[u]),
                        d = 67108863 & c;
                      (s = 67108863 & (d = (d + s) | 0)),
                        (n +=
                          (o =
                            ((o = (o + ((c / 67108864) | 0)) | 0) +
                              (d >>> 26)) |
                            0) >>> 26),
                        (o &= 67108863);
                    }
                    (r.words[a] = s), (i = o), (o = n);
                  }
                  return 0 !== i ? (r.words[a] = i) : r.length--, r.strip();
                })(this, t, e)
              : b(this, t, e);
          }),
          (m.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = a.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t);
            return e;
          }),
          (m.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1);
            return i;
          }),
          (m.prototype.permute = function (t, e, r, i, n, a) {
            for (var o = 0; o < a; o++) (i[o] = e[t[o]]), (n[o] = r[t[o]]);
          }),
          (m.prototype.transform = function (t, e, r, i, n, a) {
            this.permute(a, t, e, r, i, n);
            for (var o = 1; o < n; o <<= 1)
              for (
                var s = o << 1,
                  f = Math.cos((2 * Math.PI) / s),
                  u = Math.sin((2 * Math.PI) / s),
                  h = 0;
                h < n;
                h += s
              )
                for (var c = f, d = u, l = 0; l < o; l++) {
                  var p = r[h + l],
                    b = i[h + l],
                    m = r[h + l + o],
                    y = i[h + l + o],
                    v = c * m - d * y;
                  (y = c * y + d * m),
                    (m = v),
                    (r[h + l] = p + m),
                    (i[h + l] = b + y),
                    (r[h + l + o] = p - m),
                    (i[h + l + o] = b - y),
                    l !== s &&
                      ((v = f * c - u * d), (d = f * d + u * c), (c = v));
                }
          }),
          (m.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (m.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i];
                (t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n);
              }
          }),
          (m.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r;
              (t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (m.prototype.convert13b = function (t, e, r, n) {
            for (var a = 0, o = 0; o < e; o++)
              (a += 0 | t[o]),
                (r[2 * o] = 8191 & a),
                (a >>>= 13),
                (r[2 * o + 1] = 8191 & a),
                (a >>>= 13);
            for (o = 2 * e; o < n; ++o) r[o] = 0;
            i(0 === a), i(0 == (-8192 & a));
          }),
          (m.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (m.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              a = this.stub(i),
              o = new Array(i),
              s = new Array(i),
              f = new Array(i),
              u = new Array(i),
              h = new Array(i),
              c = new Array(i),
              d = r.words;
            (d.length = i),
              this.convert13b(t.words, t.length, o, i),
              this.convert13b(e.words, e.length, u, i),
              this.transform(o, a, s, f, i, n),
              this.transform(u, a, h, c, i, n);
            for (var l = 0; l < i; l++) {
              var p = s[l] * h[l] - f[l] * c[l];
              (f[l] = s[l] * c[l] + f[l] * h[l]), (s[l] = p);
            }
            return (
              this.conjugate(s, f, i),
              this.transform(s, f, d, a, i, n),
              this.conjugate(d, a, i),
              this.normalize13b(d, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r.strip()
            );
          }),
          (a.prototype.mul = function (t) {
            var e = new a(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (a.prototype.mulf = function (t) {
            var e = new a(null);
            return (e.words = new Array(this.length + t.length)), b(this, t, e);
          }),
          (a.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (a.prototype.imuln = function (t) {
            i("number" == typeof t), i(t < 67108864);
            for (var e = 0, r = 0; r < this.length; r++) {
              var n = (0 | this.words[r]) * t,
                a = (67108863 & n) + (67108863 & e);
              (e >>= 26),
                (e += (n / 67108864) | 0),
                (e += a >>> 26),
                (this.words[r] = 67108863 & a);
            }
            return 0 !== e && ((this.words[r] = e), this.length++), this;
          }),
          (a.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (a.prototype.sqr = function () {
            return this.mul(this);
          }),
          (a.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (a.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = (r / 26) | 0,
                  n = r % 26;
                e[r] = (t.words[i] & (1 << n)) >>> n;
              }
              return e;
            })(t);
            if (0 === e.length) return new a(1);
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var n = r.sqr(); i < e.length; i++, n = n.sqr())
                0 !== e[i] && (r = r.mul(n));
            return r;
          }),
          (a.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              n = (t - r) / 26,
              a = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var o = 0;
              for (e = 0; e < this.length; e++) {
                var s = this.words[e] & a,
                  f = ((0 | this.words[e]) - s) << r;
                (this.words[e] = f | o), (o = s >>> (26 - r));
              }
              o && ((this.words[e] = o), this.length++);
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++) this.words[e] = 0;
              this.length += n;
            }
            return this.strip();
          }),
          (a.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (a.prototype.iushrn = function (t, e, r) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = e ? (e - (e % 26)) / 26 : 0);
            var a = t % 26,
              o = Math.min((t - a) / 26, this.length),
              s = 67108863 ^ ((67108863 >>> a) << a),
              f = r;
            if (((n -= o), (n = Math.max(0, n)), f)) {
              for (var u = 0; u < o; u++) f.words[u] = this.words[u];
              f.length = o;
            }
            if (0 === o);
            else if (this.length > o)
              for (this.length -= o, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + o];
            else (this.words[0] = 0), (this.length = 1);
            var h = 0;
            for (u = this.length - 1; u >= 0 && (0 !== h || u >= n); u--) {
              var c = 0 | this.words[u];
              (this.words[u] = (h << (26 - a)) | (c >>> a)), (h = c & s);
            }
            return (
              f && 0 !== h && (f.words[f.length++] = h),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (a.prototype.ishrn = function (t, e, r) {
            return i(0 === this.negative), this.iushrn(t, e, r);
          }),
          (a.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (a.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (a.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (a.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (a.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            return !(this.length <= r) && !!(this.words[r] & n);
          }),
          (a.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= r)
            )
              return this;
            if (
              (0 !== e && r++,
              (this.length = Math.min(r, this.length)),
              0 !== e)
            ) {
              var n = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= n;
            }
            return this.strip();
          }),
          (a.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (a.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (a.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (a.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this.strip();
          }),
          (a.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (a.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (a.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (a.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (a.prototype._ishlnsubmul = function (t, e, r) {
            var n,
              a,
              o = t.length + r;
            this._expand(o);
            var s = 0;
            for (n = 0; n < t.length; n++) {
              a = (0 | this.words[n + r]) + s;
              var f = (0 | t.words[n]) * e;
              (s = ((a -= 67108863 & f) >> 26) - ((f / 67108864) | 0)),
                (this.words[n + r] = 67108863 & a);
            }
            for (; n < this.length - r; n++)
              (s = (a = (0 | this.words[n + r]) + s) >> 26),
                (this.words[n + r] = 67108863 & a);
            if (0 === s) return this.strip();
            for (i(-1 === s), s = 0, n = 0; n < this.length; n++)
              (s = (a = -(0 | this.words[n]) + s) >> 26),
                (this.words[n] = 67108863 & a);
            return (this.negative = 1), this.strip();
          }),
          (a.prototype._wordDiv = function (t, e) {
            var r = (this.length, t.length),
              i = this.clone(),
              n = t,
              o = 0 | n.words[n.length - 1];
            0 !== (r = 26 - this._countBits(o)) &&
              ((n = n.ushln(r)), i.iushln(r), (o = 0 | n.words[n.length - 1]));
            var s,
              f = i.length - n.length;
            if ("mod" !== e) {
              ((s = new a(null)).length = f + 1),
                (s.words = new Array(s.length));
              for (var u = 0; u < s.length; u++) s.words[u] = 0;
            }
            var h = i.clone()._ishlnsubmul(n, 1, f);
            0 === h.negative && ((i = h), s && (s.words[f] = 1));
            for (var c = f - 1; c >= 0; c--) {
              var d =
                67108864 * (0 | i.words[n.length + c]) +
                (0 | i.words[n.length + c - 1]);
              for (
                d = Math.min((d / o) | 0, 67108863), i._ishlnsubmul(n, d, c);
                0 !== i.negative;

              )
                d--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, c),
                  i.isZero() || (i.negative ^= 1);
              s && (s.words[c] = d);
            }
            return (
              s && s.strip(),
              i.strip(),
              "div" !== e && 0 !== r && i.iushrn(r),
              { div: s || null, mod: i }
            );
          }),
          (a.prototype.divmod = function (t, e, r) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new a(0), mod: new a(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((s = this.neg().divmod(t, e)),
                  "mod" !== e && (n = s.div.neg()),
                  "div" !== e &&
                    ((o = s.mod.neg()), r && 0 !== o.negative && o.iadd(t)),
                  { div: n, mod: o })
                : 0 === this.negative && 0 !== t.negative
                ? ((s = this.divmod(t.neg(), e)),
                  "mod" !== e && (n = s.div.neg()),
                  { div: n, mod: s.mod })
                : 0 != (this.negative & t.negative)
                ? ((s = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((o = s.mod.neg()), r && 0 !== o.negative && o.isub(t)),
                  { div: s.div, mod: o })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new a(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new a(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new a(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var n, o, s;
          }),
          (a.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (a.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (a.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (a.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              a = r.cmp(i);
            return a < 0 || (1 === n && 0 === a)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (a.prototype.modn = function (t) {
            i(t <= 67108863);
            for (var e = (1 << 26) % t, r = 0, n = this.length - 1; n >= 0; n--)
              r = (e * r + (0 | this.words[n])) % t;
            return r;
          }),
          (a.prototype.idivn = function (t) {
            i(t <= 67108863);
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var n = (0 | this.words[r]) + 67108864 * e;
              (this.words[r] = (n / t) | 0), (e = n % t);
            }
            return this.strip();
          }),
          (a.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (a.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n = new a(1), o = new a(0), s = new a(0), f = new a(1), u = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++u;
            for (var h = r.clone(), c = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, l = 1;
                0 == (e.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (n.isOdd() || o.isOdd()) && (n.iadd(h), o.isub(c)),
                    n.iushrn(1),
                    o.iushrn(1);
              for (
                var p = 0, b = 1;
                0 == (r.words[0] & b) && p < 26;
                ++p, b <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (s.isOdd() || f.isOdd()) && (s.iadd(h), f.isub(c)),
                    s.iushrn(1),
                    f.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), n.isub(s), o.isub(f))
                : (r.isub(e), s.isub(n), f.isub(o));
            }
            return { a: s, b: f, gcd: r.iushln(u) };
          }),
          (a.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n, o = new a(1), s = new a(0), f = r.clone();
              e.cmpn(1) > 0 && r.cmpn(1) > 0;

            ) {
              for (
                var u = 0, h = 1;
                0 == (e.words[0] & h) && u < 26;
                ++u, h <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; )
                  o.isOdd() && o.iadd(f), o.iushrn(1);
              for (
                var c = 0, d = 1;
                0 == (r.words[0] & d) && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  s.isOdd() && s.iadd(f), s.iushrn(1);
              e.cmp(r) >= 0 ? (e.isub(r), o.isub(s)) : (r.isub(e), s.isub(o));
            }
            return (n = 0 === e.cmpn(1) ? o : s).cmpn(0) < 0 && n.iadd(t), n;
          }),
          (a.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                var a = e;
                (e = r), (r = a);
              } else if (0 === n || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(i);
          }),
          (a.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (a.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (a.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (a.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (a.prototype.bincn = function (t) {
            i("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= n), this;
            for (var a = n, o = r; 0 !== a && o < this.length; o++) {
              var s = 0 | this.words[o];
              (a = (s += a) >>> 26), (s &= 67108863), (this.words[o] = s);
            }
            return 0 !== a && ((this.words[o] = a), this.length++), this;
          }),
          (a.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (a.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this.strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (a.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (a.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r];
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1);
                break;
              }
            }
            return e;
          }),
          (a.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (a.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (a.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (a.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (a.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (a.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (a.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (a.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (a.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (a.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (a.red = function (t) {
            return new A(t);
          }),
          (a.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (a.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (a.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (a.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (a.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (a.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (a.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (a.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (a.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (a.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (a.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (a.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (a.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (a.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (a.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (a.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (a.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var y = { k256: null, p224: null, p192: null, p25519: null };
        function v(t, e) {
          (this.name = t),
            (this.p = new a(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new a(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function g() {
          v.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function w() {
          v.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function _() {
          v.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function M() {
          v.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function A(t) {
          if ("string" == typeof t) {
            var e = a._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function x(t) {
          A.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new a(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (v.prototype._tmp = function () {
          var t = new a(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (v.prototype.ireduce = function (t) {
            var e,
              r = t;
            do {
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            } while (e > this.n);
            var i = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (v.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (v.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(g, v),
          (g.prototype.split = function (t, e) {
            for (var r = Math.min(t.length, 9), i = 0; i < r; i++)
              e.words[i] = t.words[i];
            if (((e.length = r), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var n = t.words[9];
            for (e.words[e.length++] = 4194303 & n, i = 10; i < t.length; i++) {
              var a = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & a) << 4) | (n >>> 22)), (n = a);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (g.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              (e += 977 * i),
                (t.words[r] = 67108863 & e),
                (e = 64 * i + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(w, v),
          n(_, v),
          n(M, v),
          (M.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i;
              (i >>>= 26), (t.words[r] = n), (e = i);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (a._prime = function (t) {
            if (y[t]) return y[t];
            var e;
            if ("k256" === t) e = new g();
            else if ("p224" === t) e = new w();
            else if ("p192" === t) e = new _();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new M();
            }
            return (y[t] = e), e;
          }),
          (A.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (A.prototype._verify2 = function (t, e) {
            i(0 == (t.negative | e.negative), "red works only with positives"),
              i(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (A.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (A.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (A.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (A.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (A.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
          }),
          (A.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r;
          }),
          (A.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (A.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (A.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (A.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (A.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (A.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((i(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new a(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var n = this.m.subn(1), o = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              o++, n.iushrn(1);
            i(!n.isZero());
            var s = new a(1).toRed(this),
              f = s.redNeg(),
              u = this.m.subn(1).iushrn(1),
              h = this.m.bitLength();
            for (
              h = new a(2 * h * h).toRed(this);
              0 !== this.pow(h, u).cmp(f);

            )
              h.redIAdd(f);
            for (
              var c = this.pow(h, n),
                d = this.pow(t, n.addn(1).iushrn(1)),
                l = this.pow(t, n),
                p = o;
              0 !== l.cmp(s);

            ) {
              for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
              i(m < p);
              var y = this.pow(c, new a(1).iushln(p - m - 1));
              (d = d.redMul(y)), (c = y.redSqr()), (l = l.redMul(c)), (p = m);
            }
            return d;
          }),
          (A.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (A.prototype.pow = function (t, e) {
            if (e.isZero()) return new a(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = new Array(16);
            (r[0] = new a(1).toRed(this)), (r[1] = t);
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
            var n = r[0],
              o = 0,
              s = 0,
              f = e.bitLength() % 26;
            for (0 === f && (f = 26), i = e.length - 1; i >= 0; i--) {
              for (var u = e.words[i], h = f - 1; h >= 0; h--) {
                var c = (u >> h) & 1;
                n !== r[0] && (n = this.sqr(n)),
                  0 !== c || 0 !== o
                    ? ((o <<= 1),
                      (o |= c),
                      (4 === ++s || (0 === i && 0 === h)) &&
                        ((n = this.mul(n, r[o])), (s = 0), (o = 0)))
                    : (s = 0);
              }
              f = 26;
            }
            return n;
          }),
          (A.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (A.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (a.mont = function (t) {
            return new x(t);
          }),
          n(x, A),
          (x.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (x.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (x.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              a = n;
            return (
              n.cmp(this.m) >= 0
                ? (a = n.isub(this.m))
                : n.cmpn(0) < 0 && (a = n.iadd(this.m)),
              a._forceRed(this)
            );
          }),
          (x.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new a(0)._forceRed(this);
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (x.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })(t, this);
    }).call(this, r(19)(t));
  },
  function (t, e) {
    function r(t, e) {
      if (!t) throw new Error(e || "Assertion failed");
    }
    (t.exports = r),
      (r.equal = function (t, e, r) {
        if (t != e) throw new Error(r || "Assertion failed: " + t + " != " + e);
      });
  },
  function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.sha256 =
        e.generateKeyPair =
        e.constructElliptic =
        e.Signature =
        e.PublicKey =
        e.PrivateKey =
          void 0);
    var i = r(18),
      n = r(6),
      a = r(2),
      o = r(23),
      s = r(24),
      f = r(24);
    Object.defineProperty(e, "PrivateKey", {
      enumerable: !0,
      get: function () {
        return f.PrivateKey;
      },
    });
    var u = r(23);
    Object.defineProperty(e, "PublicKey", {
      enumerable: !0,
      get: function () {
        return u.PublicKey;
      },
    });
    var h = r(58);
    Object.defineProperty(e, "Signature", {
      enumerable: !0,
      get: function () {
        return h.Signature;
      },
    });
    e.constructElliptic = function (t) {
      return t === a.KeyType.k1 ? new i.ec("secp256k1") : new i.ec("p256");
    };
    e.generateKeyPair = function (t, e) {
      if ((void 0 === e && (e = {}), !e.secureEnv))
        throw new Error(
          "Key generation is completely INSECURE in production environments in the browser. If you are absolutely certain this does NOT describe your environment, set `secureEnv` in your options to `true`.  If this does describe your environment and you set `secureEnv` to `true`, YOU DO SO AT YOUR OWN RISK AND THE RISK OF YOUR USERS."
        );
      var r,
        n = (r =
          t === a.KeyType.k1
            ? new i.ec("secp256k1")
            : new i.ec("p256")).genKeyPair(e.ecOptions);
      return {
        publicKey: o.PublicKey.fromElliptic(n, t, r),
        privateKey: s.PrivateKey.fromElliptic(n, t, r),
      };
    };
    e.sha256 = function (t) {
      return n.sha256().update(t).digest();
    };
  },
  function (t, e, r) {
    var i = e;
    (i.utils = r(1)),
      (i.common = r(7)),
      (i.sha = r(29)),
      (i.ripemd = r(33)),
      (i.hmac = r(34)),
      (i.sha1 = i.sha.sha1),
      (i.sha256 = i.sha.sha256),
      (i.sha224 = i.sha.sha224),
      (i.sha384 = i.sha.sha384),
      (i.sha512 = i.sha.sha512),
      (i.ripemd160 = i.ripemd.ripemd160);
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(4);
    function a() {
      (this.pending = null),
        (this.pendingTotal = 0),
        (this.blockSize = this.constructor.blockSize),
        (this.outSize = this.constructor.outSize),
        (this.hmacStrength = this.constructor.hmacStrength),
        (this.padLength = this.constructor.padLength / 8),
        (this.endian = "big"),
        (this._delta8 = this.blockSize / 8),
        (this._delta32 = this.blockSize / 32);
    }
    (e.BlockHash = a),
      (a.prototype.update = function (t, e) {
        if (
          ((t = i.toArray(t, e)),
          this.pending
            ? (this.pending = this.pending.concat(t))
            : (this.pending = t),
          (this.pendingTotal += t.length),
          this.pending.length >= this._delta8)
        ) {
          var r = (t = this.pending).length % this._delta8;
          (this.pending = t.slice(t.length - r, t.length)),
            0 === this.pending.length && (this.pending = null),
            (t = i.join32(t, 0, t.length - r, this.endian));
          for (var n = 0; n < t.length; n += this._delta32)
            this._update(t, n, n + this._delta32);
        }
        return this;
      }),
      (a.prototype.digest = function (t) {
        return (
          this.update(this._pad()), n(null === this.pending), this._digest(t)
        );
      }),
      (a.prototype._pad = function () {
        var t = this.pendingTotal,
          e = this._delta8,
          r = e - ((t + this.padLength) % e),
          i = new Array(r + this.padLength);
        i[0] = 128;
        for (var n = 1; n < r; n++) i[n] = 0;
        if (((t <<= 3), "big" === this.endian)) {
          for (var a = 8; a < this.padLength; a++) i[n++] = 0;
          (i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = 0),
            (i[n++] = (t >>> 24) & 255),
            (i[n++] = (t >>> 16) & 255),
            (i[n++] = (t >>> 8) & 255),
            (i[n++] = 255 & t);
        } else
          for (
            i[n++] = 255 & t,
              i[n++] = (t >>> 8) & 255,
              i[n++] = (t >>> 16) & 255,
              i[n++] = (t >>> 24) & 255,
              i[n++] = 0,
              i[n++] = 0,
              i[n++] = 0,
              i[n++] = 0,
              a = 8;
            a < this.padLength;
            a++
          )
            i[n++] = 0;
        return i;
      });
  },
  function (t, e) {
    "function" == typeof Object.create
      ? (t.exports = function (t, e) {
          e &&
            ((t.super_ = e),
            (t.prototype = Object.create(e.prototype, {
              constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })));
        })
      : (t.exports = function (t, e) {
          if (e) {
            t.super_ = e;
            var r = function () {};
            (r.prototype = e.prototype),
              (t.prototype = new r()),
              (t.prototype.constructor = t);
          }
        });
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <http://feross.org>
       * @license  MIT
       */
      var i = r(41),
        n = r(42),
        a = r(43);
      function o() {
        return f.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function s(t, e) {
        if (o() < e) throw new RangeError("Invalid typed array length");
        return (
          f.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(e)).__proto__ = f.prototype)
            : (null === t && (t = new f(e)), (t.length = e)),
          t
        );
      }
      function f(t, e, r) {
        if (!(f.TYPED_ARRAY_SUPPORT || this instanceof f))
          return new f(t, e, r);
        if ("number" == typeof t) {
          if ("string" == typeof e)
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          return c(this, t);
        }
        return u(this, t, e, r);
      }
      function u(t, e, r, i) {
        if ("number" == typeof e)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
          ? (function (t, e, r, i) {
              if ((e.byteLength, r < 0 || e.byteLength < r))
                throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < r + (i || 0))
                throw new RangeError("'length' is out of bounds");
              e =
                void 0 === r && void 0 === i
                  ? new Uint8Array(e)
                  : void 0 === i
                  ? new Uint8Array(e, r)
                  : new Uint8Array(e, r, i);
              f.TYPED_ARRAY_SUPPORT
                ? ((t = e).__proto__ = f.prototype)
                : (t = d(t, e));
              return t;
            })(t, e, r, i)
          : "string" == typeof e
          ? (function (t, e, r) {
              ("string" == typeof r && "" !== r) || (r = "utf8");
              if (!f.isEncoding(r))
                throw new TypeError(
                  '"encoding" must be a valid string encoding'
                );
              var i = 0 | p(e, r),
                n = (t = s(t, i)).write(e, r);
              n !== i && (t = t.slice(0, n));
              return t;
            })(t, e, r)
          : (function (t, e) {
              if (f.isBuffer(e)) {
                var r = 0 | l(e.length);
                return 0 === (t = s(t, r)).length || e.copy(t, 0, 0, r), t;
              }
              if (e) {
                if (
                  ("undefined" != typeof ArrayBuffer &&
                    e.buffer instanceof ArrayBuffer) ||
                  "length" in e
                )
                  return "number" != typeof e.length || (i = e.length) != i
                    ? s(t, 0)
                    : d(t, e);
                if ("Buffer" === e.type && a(e.data)) return d(t, e.data);
              }
              var i;
              throw new TypeError(
                "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
              );
            })(t, e);
      }
      function h(t) {
        if ("number" != typeof t)
          throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function c(t, e) {
        if ((h(e), (t = s(t, e < 0 ? 0 : 0 | l(e))), !f.TYPED_ARRAY_SUPPORT))
          for (var r = 0; r < e; ++r) t[r] = 0;
        return t;
      }
      function d(t, e) {
        var r = e.length < 0 ? 0 : 0 | l(e.length);
        t = s(t, r);
        for (var i = 0; i < r; i += 1) t[i] = 255 & e[i];
        return t;
      }
      function l(t) {
        if (t >= o())
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              o().toString(16) +
              " bytes"
          );
        return 0 | t;
      }
      function p(t, e) {
        if (f.isBuffer(t)) return t.length;
        if (
          "undefined" != typeof ArrayBuffer &&
          "function" == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var i = !1; ; )
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
            case void 0:
              return C(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return j(t).length;
            default:
              if (i) return C(t).length;
              (e = ("" + e).toLowerCase()), (i = !0);
          }
      }
      function b(t, e, r) {
        var i = !1;
        if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
        if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
          return "";
        if ((r >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return T(this, e, r);
            case "utf8":
            case "utf-8":
              return k(this, e, r);
            case "ascii":
              return z(this, e, r);
            case "latin1":
            case "binary":
              return E(this, e, r);
            case "base64":
              return S(this, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return R(this, e, r);
            default:
              if (i) throw new TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (i = !0);
          }
      }
      function m(t, e, r) {
        var i = t[e];
        (t[e] = t[r]), (t[r] = i);
      }
      function y(t, e, r, i, n) {
        if (0 === t.length) return -1;
        if (
          ("string" == typeof r
            ? ((i = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (r = +r),
          isNaN(r) && (r = n ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length)
        ) {
          if (n) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!n) return -1;
          r = 0;
        }
        if (("string" == typeof e && (e = f.from(e, i)), f.isBuffer(e)))
          return 0 === e.length ? -1 : v(t, e, r, i, n);
        if ("number" == typeof e)
          return (
            (e &= 255),
            f.TYPED_ARRAY_SUPPORT &&
            "function" == typeof Uint8Array.prototype.indexOf
              ? n
                ? Uint8Array.prototype.indexOf.call(t, e, r)
                : Uint8Array.prototype.lastIndexOf.call(t, e, r)
              : v(t, [e], r, i, n)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(t, e, r, i, n) {
        var a,
          o = 1,
          s = t.length,
          f = e.length;
        if (
          void 0 !== i &&
          ("ucs2" === (i = String(i).toLowerCase()) ||
            "ucs-2" === i ||
            "utf16le" === i ||
            "utf-16le" === i)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (o = 2), (s /= 2), (f /= 2), (r /= 2);
        }
        function u(t, e) {
          return 1 === o ? t[e] : t.readUInt16BE(e * o);
        }
        if (n) {
          var h = -1;
          for (a = r; a < s; a++)
            if (u(t, a) === u(e, -1 === h ? 0 : a - h)) {
              if ((-1 === h && (h = a), a - h + 1 === f)) return h * o;
            } else -1 !== h && (a -= a - h), (h = -1);
        } else
          for (r + f > s && (r = s - f), a = r; a >= 0; a--) {
            for (var c = !0, d = 0; d < f; d++)
              if (u(t, a + d) !== u(e, d)) {
                c = !1;
                break;
              }
            if (c) return a;
          }
        return -1;
      }
      function g(t, e, r, i) {
        r = Number(r) || 0;
        var n = t.length - r;
        i ? (i = Number(i)) > n && (i = n) : (i = n);
        var a = e.length;
        if (a % 2 != 0) throw new TypeError("Invalid hex string");
        i > a / 2 && (i = a / 2);
        for (var o = 0; o < i; ++o) {
          var s = parseInt(e.substr(2 * o, 2), 16);
          if (isNaN(s)) return o;
          t[r + o] = s;
        }
        return o;
      }
      function w(t, e, r, i) {
        return q(C(e, t.length - r), t, r, i);
      }
      function _(t, e, r, i) {
        return q(
          (function (t) {
            for (var e = [], r = 0; r < t.length; ++r)
              e.push(255 & t.charCodeAt(r));
            return e;
          })(e),
          t,
          r,
          i
        );
      }
      function M(t, e, r, i) {
        return _(t, e, r, i);
      }
      function A(t, e, r, i) {
        return q(j(e), t, r, i);
      }
      function x(t, e, r, i) {
        return q(
          (function (t, e) {
            for (
              var r, i, n, a = [], o = 0;
              o < t.length && !((e -= 2) < 0);
              ++o
            )
              (r = t.charCodeAt(o)),
                (i = r >> 8),
                (n = r % 256),
                a.push(n),
                a.push(i);
            return a;
          })(e, t.length - r),
          t,
          r,
          i
        );
      }
      function S(t, e, r) {
        return 0 === e && r === t.length
          ? i.fromByteArray(t)
          : i.fromByteArray(t.slice(e, r));
      }
      function k(t, e, r) {
        r = Math.min(t.length, r);
        for (var i = [], n = e; n < r; ) {
          var a,
            o,
            s,
            f,
            u = t[n],
            h = null,
            c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
          if (n + c <= r)
            switch (c) {
              case 1:
                u < 128 && (h = u);
                break;
              case 2:
                128 == (192 & (a = t[n + 1])) &&
                  (f = ((31 & u) << 6) | (63 & a)) > 127 &&
                  (h = f);
                break;
              case 3:
                (a = t[n + 1]),
                  (o = t[n + 2]),
                  128 == (192 & a) &&
                    128 == (192 & o) &&
                    (f = ((15 & u) << 12) | ((63 & a) << 6) | (63 & o)) >
                      2047 &&
                    (f < 55296 || f > 57343) &&
                    (h = f);
                break;
              case 4:
                (a = t[n + 1]),
                  (o = t[n + 2]),
                  (s = t[n + 3]),
                  128 == (192 & a) &&
                    128 == (192 & o) &&
                    128 == (192 & s) &&
                    (f =
                      ((15 & u) << 18) |
                      ((63 & a) << 12) |
                      ((63 & o) << 6) |
                      (63 & s)) > 65535 &&
                    f < 1114112 &&
                    (h = f);
            }
          null === h
            ? ((h = 65533), (c = 1))
            : h > 65535 &&
              ((h -= 65536),
              i.push(((h >>> 10) & 1023) | 55296),
              (h = 56320 | (1023 & h))),
            i.push(h),
            (n += c);
        }
        return (function (t) {
          var e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          var r = "",
            i = 0;
          for (; i < e; )
            r += String.fromCharCode.apply(String, t.slice(i, (i += 4096)));
          return r;
        })(i);
      }
      (e.Buffer = f),
        (e.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return f.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (f.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function () {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function () {
                        return 42;
                      },
                    }),
                    42 === t.foo() &&
                      "function" == typeof t.subarray &&
                      0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (e.kMaxLength = o()),
        (f.poolSize = 8192),
        (f._augment = function (t) {
          return (t.__proto__ = f.prototype), t;
        }),
        (f.from = function (t, e, r) {
          return u(null, t, e, r);
        }),
        f.TYPED_ARRAY_SUPPORT &&
          ((f.prototype.__proto__ = Uint8Array.prototype),
          (f.__proto__ = Uint8Array),
          "undefined" != typeof Symbol &&
            Symbol.species &&
            f[Symbol.species] === f &&
            Object.defineProperty(f, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (f.alloc = function (t, e, r) {
          return (function (t, e, r, i) {
            return (
              h(e),
              e <= 0
                ? s(t, e)
                : void 0 !== r
                ? "string" == typeof i
                  ? s(t, e).fill(r, i)
                  : s(t, e).fill(r)
                : s(t, e)
            );
          })(null, t, e, r);
        }),
        (f.allocUnsafe = function (t) {
          return c(null, t);
        }),
        (f.allocUnsafeSlow = function (t) {
          return c(null, t);
        }),
        (f.isBuffer = function (t) {
          return !(null == t || !t._isBuffer);
        }),
        (f.compare = function (t, e) {
          if (!f.isBuffer(t) || !f.isBuffer(e))
            throw new TypeError("Arguments must be Buffers");
          if (t === e) return 0;
          for (
            var r = t.length, i = e.length, n = 0, a = Math.min(r, i);
            n < a;
            ++n
          )
            if (t[n] !== e[n]) {
              (r = t[n]), (i = e[n]);
              break;
            }
          return r < i ? -1 : i < r ? 1 : 0;
        }),
        (f.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (f.concat = function (t, e) {
          if (!a(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return f.alloc(0);
          var r;
          if (void 0 === e)
            for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
          var i = f.allocUnsafe(e),
            n = 0;
          for (r = 0; r < t.length; ++r) {
            var o = t[r];
            if (!f.isBuffer(o))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            o.copy(i, n), (n += o.length);
          }
          return i;
        }),
        (f.byteLength = p),
        (f.prototype._isBuffer = !0),
        (f.prototype.swap16 = function () {
          var t = this.length;
          if (t % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e = 0; e < t; e += 2) m(this, e, e + 1);
          return this;
        }),
        (f.prototype.swap32 = function () {
          var t = this.length;
          if (t % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e = 0; e < t; e += 4)
            m(this, e, e + 3), m(this, e + 1, e + 2);
          return this;
        }),
        (f.prototype.swap64 = function () {
          var t = this.length;
          if (t % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e = 0; e < t; e += 8)
            m(this, e, e + 7),
              m(this, e + 1, e + 6),
              m(this, e + 2, e + 5),
              m(this, e + 3, e + 4);
          return this;
        }),
        (f.prototype.toString = function () {
          var t = 0 | this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? k(this, 0, t)
            : b.apply(this, arguments);
        }),
        (f.prototype.equals = function (t) {
          if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === f.compare(this, t);
        }),
        (f.prototype.inspect = function () {
          var t = "",
            r = e.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString("hex", 0, r).match(/.{2}/g).join(" ")),
              this.length > r && (t += " ... ")),
            "<Buffer " + t + ">"
          );
        }),
        (f.prototype.compare = function (t, e, r, i, n) {
          if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          if (
            (void 0 === e && (e = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === n && (n = this.length),
            e < 0 || r > t.length || i < 0 || n > this.length)
          )
            throw new RangeError("out of range index");
          if (i >= n && e >= r) return 0;
          if (i >= n) return -1;
          if (e >= r) return 1;
          if (this === t) return 0;
          for (
            var a = (n >>>= 0) - (i >>>= 0),
              o = (r >>>= 0) - (e >>>= 0),
              s = Math.min(a, o),
              u = this.slice(i, n),
              h = t.slice(e, r),
              c = 0;
            c < s;
            ++c
          )
            if (u[c] !== h[c]) {
              (a = u[c]), (o = h[c]);
              break;
            }
          return a < o ? -1 : o < a ? 1 : 0;
        }),
        (f.prototype.includes = function (t, e, r) {
          return -1 !== this.indexOf(t, e, r);
        }),
        (f.prototype.indexOf = function (t, e, r) {
          return y(this, t, e, r, !0);
        }),
        (f.prototype.lastIndexOf = function (t, e, r) {
          return y(this, t, e, r, !1);
        }),
        (f.prototype.write = function (t, e, r, i) {
          if (void 0 === e) (i = "utf8"), (r = this.length), (e = 0);
          else if (void 0 === r && "string" == typeof e)
            (i = e), (r = this.length), (e = 0);
          else {
            if (!isFinite(e))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (e |= 0),
              isFinite(r)
                ? ((r |= 0), void 0 === i && (i = "utf8"))
                : ((i = r), (r = void 0));
          }
          var n = this.length - e;
          if (
            ((void 0 === r || r > n) && (r = n),
            (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          i || (i = "utf8");
          for (var a = !1; ; )
            switch (i) {
              case "hex":
                return g(this, t, e, r);
              case "utf8":
              case "utf-8":
                return w(this, t, e, r);
              case "ascii":
                return _(this, t, e, r);
              case "latin1":
              case "binary":
                return M(this, t, e, r);
              case "base64":
                return A(this, t, e, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return x(this, t, e, r);
              default:
                if (a) throw new TypeError("Unknown encoding: " + i);
                (i = ("" + i).toLowerCase()), (a = !0);
            }
        }),
        (f.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      function z(t, e, r) {
        var i = "";
        r = Math.min(t.length, r);
        for (var n = e; n < r; ++n) i += String.fromCharCode(127 & t[n]);
        return i;
      }
      function E(t, e, r) {
        var i = "";
        r = Math.min(t.length, r);
        for (var n = e; n < r; ++n) i += String.fromCharCode(t[n]);
        return i;
      }
      function T(t, e, r) {
        var i = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > i) && (r = i);
        for (var n = "", a = e; a < r; ++a) n += K(t[a]);
        return n;
      }
      function R(t, e, r) {
        for (var i = t.slice(e, r), n = "", a = 0; a < i.length; a += 2)
          n += String.fromCharCode(i[a] + 256 * i[a + 1]);
        return n;
      }
      function P(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > r)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function I(t, e, r, i, n, a) {
        if (!f.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > n || e < a)
          throw new RangeError('"value" argument is out of bounds');
        if (r + i > t.length) throw new RangeError("Index out of range");
      }
      function N(t, e, r, i) {
        e < 0 && (e = 65535 + e + 1);
        for (var n = 0, a = Math.min(t.length - r, 2); n < a; ++n)
          t[r + n] =
            (e & (255 << (8 * (i ? n : 1 - n)))) >>> (8 * (i ? n : 1 - n));
      }
      function U(t, e, r, i) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var n = 0, a = Math.min(t.length - r, 4); n < a; ++n)
          t[r + n] = (e >>> (8 * (i ? n : 3 - n))) & 255;
      }
      function B(t, e, r, i, n, a) {
        if (r + i > t.length) throw new RangeError("Index out of range");
        if (r < 0) throw new RangeError("Index out of range");
      }
      function O(t, e, r, i, a) {
        return a || B(t, 0, r, 4), n.write(t, e, r, i, 23, 4), r + 4;
      }
      function D(t, e, r, i, a) {
        return a || B(t, 0, r, 8), n.write(t, e, r, i, 52, 8), r + 8;
      }
      (f.prototype.slice = function (t, e) {
        var r,
          i = this.length;
        if (
          ((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
          (e = void 0 === e ? i : ~~e) < 0
            ? (e += i) < 0 && (e = 0)
            : e > i && (e = i),
          e < t && (e = t),
          f.TYPED_ARRAY_SUPPORT)
        )
          (r = this.subarray(t, e)).__proto__ = f.prototype;
        else {
          var n = e - t;
          r = new f(n, void 0);
          for (var a = 0; a < n; ++a) r[a] = this[a + t];
        }
        return r;
      }),
        (f.prototype.readUIntLE = function (t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var i = this[t], n = 1, a = 0; ++a < e && (n *= 256); )
            i += this[t + a] * n;
          return i;
        }),
        (f.prototype.readUIntBE = function (t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var i = this[t + --e], n = 1; e > 0 && (n *= 256); )
            i += this[t + --e] * n;
          return i;
        }),
        (f.prototype.readUInt8 = function (t, e) {
          return e || P(t, 1, this.length), this[t];
        }),
        (f.prototype.readUInt16LE = function (t, e) {
          return e || P(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (f.prototype.readUInt16BE = function (t, e) {
          return e || P(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (f.prototype.readUInt32LE = function (t, e) {
          return (
            e || P(t, 4, this.length),
            (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
              16777216 * this[t + 3]
          );
        }),
        (f.prototype.readUInt32BE = function (t, e) {
          return (
            e || P(t, 4, this.length),
            16777216 * this[t] +
              ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (f.prototype.readIntLE = function (t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var i = this[t], n = 1, a = 0; ++a < e && (n *= 256); )
            i += this[t + a] * n;
          return i >= (n *= 128) && (i -= Math.pow(2, 8 * e)), i;
        }),
        (f.prototype.readIntBE = function (t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var i = e, n = 1, a = this[t + --i]; i > 0 && (n *= 256); )
            a += this[t + --i] * n;
          return a >= (n *= 128) && (a -= Math.pow(2, 8 * e)), a;
        }),
        (f.prototype.readInt8 = function (t, e) {
          return (
            e || P(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (f.prototype.readInt16LE = function (t, e) {
          e || P(t, 2, this.length);
          var r = this[t] | (this[t + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (f.prototype.readInt16BE = function (t, e) {
          e || P(t, 2, this.length);
          var r = this[t + 1] | (this[t] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (f.prototype.readInt32LE = function (t, e) {
          return (
            e || P(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (f.prototype.readInt32BE = function (t, e) {
          return (
            e || P(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (f.prototype.readFloatLE = function (t, e) {
          return e || P(t, 4, this.length), n.read(this, t, !0, 23, 4);
        }),
        (f.prototype.readFloatBE = function (t, e) {
          return e || P(t, 4, this.length), n.read(this, t, !1, 23, 4);
        }),
        (f.prototype.readDoubleLE = function (t, e) {
          return e || P(t, 8, this.length), n.read(this, t, !0, 52, 8);
        }),
        (f.prototype.readDoubleBE = function (t, e) {
          return e || P(t, 8, this.length), n.read(this, t, !1, 52, 8);
        }),
        (f.prototype.writeUIntLE = function (t, e, r, i) {
          ((t = +t), (e |= 0), (r |= 0), i) ||
            I(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
          var n = 1,
            a = 0;
          for (this[e] = 255 & t; ++a < r && (n *= 256); )
            this[e + a] = (t / n) & 255;
          return e + r;
        }),
        (f.prototype.writeUIntBE = function (t, e, r, i) {
          ((t = +t), (e |= 0), (r |= 0), i) ||
            I(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
          var n = r - 1,
            a = 1;
          for (this[e + n] = 255 & t; --n >= 0 && (a *= 256); )
            this[e + n] = (t / a) & 255;
          return e + r;
        }),
        (f.prototype.writeUInt8 = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 1, 255, 0),
            f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (f.prototype.writeUInt16LE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 2, 65535, 0),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
              : N(this, t, e, !0),
            e + 2
          );
        }),
        (f.prototype.writeUInt16BE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 2, 65535, 0),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
              : N(this, t, e, !1),
            e + 2
          );
        }),
        (f.prototype.writeUInt32LE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 4, 4294967295, 0),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t))
              : U(this, t, e, !0),
            e + 4
          );
        }),
        (f.prototype.writeUInt32BE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 4, 4294967295, 0),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t))
              : U(this, t, e, !1),
            e + 4
          );
        }),
        (f.prototype.writeIntLE = function (t, e, r, i) {
          if (((t = +t), (e |= 0), !i)) {
            var n = Math.pow(2, 8 * r - 1);
            I(this, t, e, r, n - 1, -n);
          }
          var a = 0,
            o = 1,
            s = 0;
          for (this[e] = 255 & t; ++a < r && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + a - 1] && (s = 1),
              (this[e + a] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (f.prototype.writeIntBE = function (t, e, r, i) {
          if (((t = +t), (e |= 0), !i)) {
            var n = Math.pow(2, 8 * r - 1);
            I(this, t, e, r, n - 1, -n);
          }
          var a = r - 1,
            o = 1,
            s = 0;
          for (this[e + a] = 255 & t; --a >= 0 && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + a + 1] && (s = 1),
              (this[e + a] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (f.prototype.writeInt8 = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 1, 127, -128),
            f.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (f.prototype.writeInt16LE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 2, 32767, -32768),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
              : N(this, t, e, !0),
            e + 2
          );
        }),
        (f.prototype.writeInt16BE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 2, 32767, -32768),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
              : N(this, t, e, !1),
            e + 2
          );
        }),
        (f.prototype.writeInt32LE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 4, 2147483647, -2147483648),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                (this[e + 2] = t >>> 16),
                (this[e + 3] = t >>> 24))
              : U(this, t, e, !0),
            e + 4
          );
        }),
        (f.prototype.writeInt32BE = function (t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || I(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            f.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t))
              : U(this, t, e, !1),
            e + 4
          );
        }),
        (f.prototype.writeFloatLE = function (t, e, r) {
          return O(this, t, e, !0, r);
        }),
        (f.prototype.writeFloatBE = function (t, e, r) {
          return O(this, t, e, !1, r);
        }),
        (f.prototype.writeDoubleLE = function (t, e, r) {
          return D(this, t, e, !0, r);
        }),
        (f.prototype.writeDoubleBE = function (t, e, r) {
          return D(this, t, e, !1, r);
        }),
        (f.prototype.copy = function (t, e, r, i) {
          if (
            (r || (r = 0),
            i || 0 === i || (i = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            i > 0 && i < r && (i = r),
            i === r)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (i < 0) throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
            t.length - e < i - r && (i = t.length - e + r);
          var n,
            a = i - r;
          if (this === t && r < e && e < i)
            for (n = a - 1; n >= 0; --n) t[n + e] = this[n + r];
          else if (a < 1e3 || !f.TYPED_ARRAY_SUPPORT)
            for (n = 0; n < a; ++n) t[n + e] = this[n + r];
          else Uint8Array.prototype.set.call(t, this.subarray(r, r + a), e);
          return a;
        }),
        (f.prototype.fill = function (t, e, r, i) {
          if ("string" == typeof t) {
            if (
              ("string" == typeof e
                ? ((i = e), (e = 0), (r = this.length))
                : "string" == typeof r && ((i = r), (r = this.length)),
              1 === t.length)
            ) {
              var n = t.charCodeAt(0);
              n < 256 && (t = n);
            }
            if (void 0 !== i && "string" != typeof i)
              throw new TypeError("encoding must be a string");
            if ("string" == typeof i && !f.isEncoding(i))
              throw new TypeError("Unknown encoding: " + i);
          } else "number" == typeof t && (t &= 255);
          if (e < 0 || this.length < e || this.length < r)
            throw new RangeError("Out of range index");
          if (r <= e) return this;
          var a;
          if (
            ((e >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            t || (t = 0),
            "number" == typeof t)
          )
            for (a = e; a < r; ++a) this[a] = t;
          else {
            var o = f.isBuffer(t) ? t : C(new f(t, i).toString()),
              s = o.length;
            for (a = 0; a < r - e; ++a) this[a + e] = o[a % s];
          }
          return this;
        });
      var L = /[^+\/0-9A-Za-z-_]/g;
      function K(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function C(t, e) {
        var r;
        e = e || 1 / 0;
        for (var i = t.length, n = null, a = [], o = 0; o < i; ++o) {
          if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
            if (!n) {
              if (r > 56319) {
                (e -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              if (o + 1 === i) {
                (e -= 3) > -1 && a.push(239, 191, 189);
                continue;
              }
              n = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && a.push(239, 191, 189), (n = r);
              continue;
            }
            r = 65536 + (((n - 55296) << 10) | (r - 56320));
          } else n && (e -= 3) > -1 && a.push(239, 191, 189);
          if (((n = null), r < 128)) {
            if ((e -= 1) < 0) break;
            a.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            a.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            a.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            a.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          }
        }
        return a;
      }
      function j(t) {
        return i.toByteArray(
          (function (t) {
            if (
              (t = (function (t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              })(t).replace(L, "")).length < 2
            )
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function q(t, e, r, i) {
        for (var n = 0; n < i && !(n + r >= e.length || n >= t.length); ++n)
          e[n + r] = t[n];
        return n;
      }
    }).call(this, r(16));
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(0),
      a = n.getNAF,
      o = n.getJSF,
      s = n.assert;
    function f(t, e) {
      (this.type = t),
        (this.p = new i(e.p, 16)),
        (this.red = e.prime ? i.red(e.prime) : i.mont(this.p)),
        (this.zero = new i(0).toRed(this.red)),
        (this.one = new i(1).toRed(this.red)),
        (this.two = new i(2).toRed(this.red)),
        (this.n = e.n && new i(e.n, 16)),
        (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
        (this._wnafT1 = new Array(4)),
        (this._wnafT2 = new Array(4)),
        (this._wnafT3 = new Array(4)),
        (this._wnafT4 = new Array(4)),
        (this._bitLength = this.n ? this.n.bitLength() : 0);
      var r = this.n && this.p.div(this.n);
      !r || r.cmpn(100) > 0
        ? (this.redN = null)
        : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
    }
    function u(t, e) {
      (this.curve = t), (this.type = e), (this.precomputed = null);
    }
    (t.exports = f),
      (f.prototype.point = function () {
        throw new Error("Not implemented");
      }),
      (f.prototype.validate = function () {
        throw new Error("Not implemented");
      }),
      (f.prototype._fixedNafMul = function (t, e) {
        s(t.precomputed);
        var r = t._getDoubles(),
          i = a(e, 1, this._bitLength),
          n = (1 << (r.step + 1)) - (r.step % 2 == 0 ? 2 : 1);
        n /= 3;
        var o,
          f,
          u = [];
        for (o = 0; o < i.length; o += r.step) {
          f = 0;
          for (var h = o + r.step - 1; h >= o; h--) f = (f << 1) + i[h];
          u.push(f);
        }
        for (
          var c = this.jpoint(null, null, null),
            d = this.jpoint(null, null, null),
            l = n;
          l > 0;
          l--
        ) {
          for (o = 0; o < u.length; o++)
            (f = u[o]) === l
              ? (d = d.mixedAdd(r.points[o]))
              : f === -l && (d = d.mixedAdd(r.points[o].neg()));
          c = c.add(d);
        }
        return c.toP();
      }),
      (f.prototype._wnafMul = function (t, e) {
        var r = 4,
          i = t._getNAFPoints(r);
        r = i.wnd;
        for (
          var n = i.points,
            o = a(e, r, this._bitLength),
            f = this.jpoint(null, null, null),
            u = o.length - 1;
          u >= 0;
          u--
        ) {
          for (var h = 0; u >= 0 && 0 === o[u]; u--) h++;
          if ((u >= 0 && h++, (f = f.dblp(h)), u < 0)) break;
          var c = o[u];
          s(0 !== c),
            (f =
              "affine" === t.type
                ? c > 0
                  ? f.mixedAdd(n[(c - 1) >> 1])
                  : f.mixedAdd(n[(-c - 1) >> 1].neg())
                : c > 0
                ? f.add(n[(c - 1) >> 1])
                : f.add(n[(-c - 1) >> 1].neg()));
        }
        return "affine" === t.type ? f.toP() : f;
      }),
      (f.prototype._wnafMulAdd = function (t, e, r, i, n) {
        var s,
          f,
          u,
          h = this._wnafT1,
          c = this._wnafT2,
          d = this._wnafT3,
          l = 0;
        for (s = 0; s < i; s++) {
          var p = (u = e[s])._getNAFPoints(t);
          (h[s] = p.wnd), (c[s] = p.points);
        }
        for (s = i - 1; s >= 1; s -= 2) {
          var b = s - 1,
            m = s;
          if (1 === h[b] && 1 === h[m]) {
            var y = [e[b], null, null, e[m]];
            0 === e[b].y.cmp(e[m].y)
              ? ((y[1] = e[b].add(e[m])),
                (y[2] = e[b].toJ().mixedAdd(e[m].neg())))
              : 0 === e[b].y.cmp(e[m].y.redNeg())
              ? ((y[1] = e[b].toJ().mixedAdd(e[m])),
                (y[2] = e[b].add(e[m].neg())))
              : ((y[1] = e[b].toJ().mixedAdd(e[m])),
                (y[2] = e[b].toJ().mixedAdd(e[m].neg())));
            var v = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
              g = o(r[b], r[m]);
            for (
              l = Math.max(g[0].length, l),
                d[b] = new Array(l),
                d[m] = new Array(l),
                f = 0;
              f < l;
              f++
            ) {
              var w = 0 | g[0][f],
                _ = 0 | g[1][f];
              (d[b][f] = v[3 * (w + 1) + (_ + 1)]), (d[m][f] = 0), (c[b] = y);
            }
          } else
            (d[b] = a(r[b], h[b], this._bitLength)),
              (d[m] = a(r[m], h[m], this._bitLength)),
              (l = Math.max(d[b].length, l)),
              (l = Math.max(d[m].length, l));
        }
        var M = this.jpoint(null, null, null),
          A = this._wnafT4;
        for (s = l; s >= 0; s--) {
          for (var x = 0; s >= 0; ) {
            var S = !0;
            for (f = 0; f < i; f++)
              (A[f] = 0 | d[f][s]), 0 !== A[f] && (S = !1);
            if (!S) break;
            x++, s--;
          }
          if ((s >= 0 && x++, (M = M.dblp(x)), s < 0)) break;
          for (f = 0; f < i; f++) {
            var k = A[f];
            0 !== k &&
              (k > 0
                ? (u = c[f][(k - 1) >> 1])
                : k < 0 && (u = c[f][(-k - 1) >> 1].neg()),
              (M = "affine" === u.type ? M.mixedAdd(u) : M.add(u)));
          }
        }
        for (s = 0; s < i; s++) c[s] = null;
        return n ? M : M.toP();
      }),
      (f.BasePoint = u),
      (u.prototype.eq = function () {
        throw new Error("Not implemented");
      }),
      (u.prototype.validate = function () {
        return this.curve.validate(this);
      }),
      (f.prototype.decodePoint = function (t, e) {
        t = n.toArray(t, e);
        var r = this.p.byteLength();
        if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r)
          return (
            6 === t[0]
              ? s(t[t.length - 1] % 2 == 0)
              : 7 === t[0] && s(t[t.length - 1] % 2 == 1),
            this.point(t.slice(1, 1 + r), t.slice(1 + r, 1 + 2 * r))
          );
        if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r)
          return this.pointFromX(t.slice(1, 1 + r), 3 === t[0]);
        throw new Error("Unknown point format");
      }),
      (u.prototype.encodeCompressed = function (t) {
        return this.encode(t, !0);
      }),
      (u.prototype._encode = function (t) {
        var e = this.curve.p.byteLength(),
          r = this.getX().toArray("be", e);
        return t
          ? [this.getY().isEven() ? 2 : 3].concat(r)
          : [4].concat(r, this.getY().toArray("be", e));
      }),
      (u.prototype.encode = function (t, e) {
        return n.encode(this._encode(e), t);
      }),
      (u.prototype.precompute = function (t) {
        if (this.precomputed) return this;
        var e = { doubles: null, naf: null, beta: null };
        return (
          (e.naf = this._getNAFPoints(8)),
          (e.doubles = this._getDoubles(4, t)),
          (e.beta = this._getBeta()),
          (this.precomputed = e),
          this
        );
      }),
      (u.prototype._hasDoubles = function (t) {
        if (!this.precomputed) return !1;
        var e = this.precomputed.doubles;
        return (
          !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
        );
      }),
      (u.prototype._getDoubles = function (t, e) {
        if (this.precomputed && this.precomputed.doubles)
          return this.precomputed.doubles;
        for (var r = [this], i = this, n = 0; n < e; n += t) {
          for (var a = 0; a < t; a++) i = i.dbl();
          r.push(i);
        }
        return { step: t, points: r };
      }),
      (u.prototype._getNAFPoints = function (t) {
        if (this.precomputed && this.precomputed.naf)
          return this.precomputed.naf;
        for (
          var e = [this],
            r = (1 << t) - 1,
            i = 1 === r ? null : this.dbl(),
            n = 1;
          n < r;
          n++
        )
          e[n] = e[n - 1].add(i);
        return { wnd: t, points: e };
      }),
      (u.prototype._getBeta = function () {
        return null;
      }),
      (u.prototype.dblp = function (t) {
        for (var e = this, r = 0; r < t; r++) e = e.dbl();
        return e;
      });
  },
  function (t, e, r) {
    "use strict";
    var i,
      n = e,
      a = r(6),
      o = r(22),
      s = r(0).assert;
    function f(t) {
      "short" === t.type
        ? (this.curve = new o.short(t))
        : "edwards" === t.type
        ? (this.curve = new o.edwards(t))
        : (this.curve = new o.mont(t)),
        (this.g = this.curve.g),
        (this.n = this.curve.n),
        (this.hash = t.hash),
        s(this.g.validate(), "Invalid curve"),
        s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    function u(t, e) {
      Object.defineProperty(n, t, {
        configurable: !0,
        enumerable: !0,
        get: function () {
          var r = new f(e);
          return (
            Object.defineProperty(n, t, {
              configurable: !0,
              enumerable: !0,
              value: r,
            }),
            r
          );
        },
      });
    }
    (n.PresetCurve = f),
      u("p192", {
        type: "short",
        prime: "p192",
        p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
        b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
        n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
        hash: a.sha256,
        gRed: !1,
        g: [
          "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
          "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
        ],
      }),
      u("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: a.sha256,
        gRed: !1,
        g: [
          "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
          "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
        ],
      }),
      u("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: a.sha256,
        gRed: !1,
        g: [
          "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
          "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
        ],
      }),
      u("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: a.sha384,
        gRed: !1,
        g: [
          "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
          "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
        ],
      }),
      u("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: a.sha512,
        gRed: !1,
        g: [
          "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
          "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
        ],
      }),
      u("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: a.sha256,
        gRed: !1,
        g: ["9"],
      }),
      u("ed25519", {
        type: "edwards",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "-1",
        c: "1",
        d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: a.sha256,
        gRed: !1,
        g: [
          "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
          "6666666666666666666666666666666666666666666666666666666666666658",
        ],
      });
    try {
      i = r(50);
    } catch (t) {
      i = void 0;
    }
    u("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: a.sha256,
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda:
        "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3",
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15",
        },
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        i,
      ],
    });
  },
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__assign) ||
        function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, r = 1, i = arguments.length; r < i; r++)
                for (var n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }).apply(this, arguments);
        },
      n =
        (this && this.__read) ||
        function (t, e) {
          var r = "function" == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var i,
            n,
            a = r.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; )
              o.push(i.value);
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              i && !i.done && (r = a.return) && r.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          return o;
        },
      a =
        (this && this.__spreadArray) ||
        function (t, e) {
          for (var r = 0, i = e.length, n = t.length; r < i; r++, n++)
            t[n] = e[r];
          return t;
        },
      o =
        (this && this.__values) ||
        function (t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            i = 0;
          if (r) return r.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && i >= t.length && (t = void 0),
                  { value: t && t[i++], done: !t }
                );
              },
            };
          throw new TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.serializeQuery =
        e.deserializeAnyArray =
        e.serializeAnyArray =
        e.deserializeAnyObject =
        e.serializeAnyObject =
        e.deserializeAnyvarShort =
        e.deserializeAnyvar =
        e.serializeAnyvar =
        e.deserializeAction =
        e.deserializeActionData =
        e.serializeAction =
        e.serializeActionData =
        e.transactionHeader =
        e.getTypesFromAbi =
        e.getType =
        e.createTransactionTypes =
        e.createTransactionExtensionTypes =
        e.createAbiTypes =
        e.createInitialTypes =
        e.hexToUint8Array =
        e.arrayToHex =
        e.symbolToString =
        e.stringToSymbol =
        e.blockTimestampToDate =
        e.dateToBlockTimestamp =
        e.timePointSecToDate =
        e.dateToTimePointSec =
        e.timePointToDate =
        e.dateToTimePoint =
        e.supportedAbiVersion =
        e.SerialBuffer =
        e.SerializerState =
          void 0);
    var s = r(2),
      f = function (t) {
        void 0 === t && (t = {}),
          (this.skippedBinaryExtension = !1),
          (this.options = t);
      };
    e.SerializerState = f;
    var u = (function () {
      function t(t) {
        var e = void 0 === t ? {} : t,
          r = e.textEncoder,
          i = e.textDecoder,
          n = e.array;
        (this.readPos = 0),
          (this.array = n || new Uint8Array(1024)),
          (this.length = n ? n.length : 0),
          (this.textEncoder = r || new TextEncoder()),
          (this.textDecoder = i || new TextDecoder("utf-8", { fatal: !0 }));
      }
      return (
        (t.prototype.reserve = function (t) {
          if (!(this.length + t <= this.array.length)) {
            for (var e = this.array.length; this.length + t > e; )
              e = Math.ceil(1.5 * e);
            var r = new Uint8Array(e);
            r.set(this.array), (this.array = r);
          }
        }),
        (t.prototype.haveReadData = function () {
          return this.readPos < this.length;
        }),
        (t.prototype.restartRead = function () {
          this.readPos = 0;
        }),
        (t.prototype.asUint8Array = function () {
          return new Uint8Array(
            this.array.buffer,
            this.array.byteOffset,
            this.length
          );
        }),
        (t.prototype.pushArray = function (t) {
          this.reserve(t.length),
            this.array.set(t, this.length),
            (this.length += t.length);
        }),
        (t.prototype.push = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          this.pushArray(t);
        }),
        (t.prototype.get = function () {
          if (this.readPos < this.length) return this.array[this.readPos++];
          throw new Error("Read past end of buffer");
        }),
        (t.prototype.pushUint8ArrayChecked = function (t, e) {
          if (t.length !== e) throw new Error("Binary data has incorrect size");
          this.pushArray(t);
        }),
        (t.prototype.getUint8Array = function (t) {
          if (this.readPos + t > this.length)
            throw new Error("Read past end of buffer");
          var e = new Uint8Array(
            this.array.buffer,
            this.array.byteOffset + this.readPos,
            t
          );
          return (this.readPos += t), e;
        }),
        (t.prototype.skip = function (t) {
          if (this.readPos + t > this.length)
            throw new Error("Read past end of buffer");
          this.readPos += t;
        }),
        (t.prototype.pushUint16 = function (t) {
          this.push((t >> 0) & 255, (t >> 8) & 255);
        }),
        (t.prototype.getUint16 = function () {
          var t = 0;
          return (t |= this.get() << 0), (t |= this.get() << 8);
        }),
        (t.prototype.pushUint32 = function (t) {
          this.push(
            (t >> 0) & 255,
            (t >> 8) & 255,
            (t >> 16) & 255,
            (t >> 24) & 255
          );
        }),
        (t.prototype.getUint32 = function () {
          var t = 0;
          return (
            (t |= this.get() << 0),
            (t |= this.get() << 8),
            (t |= this.get() << 16),
            (t |= this.get() << 24) >>> 0
          );
        }),
        (t.prototype.pushNumberAsUint64 = function (t) {
          this.pushUint32(t >>> 0),
            this.pushUint32(Math.floor(t / 4294967296) >>> 0);
        }),
        (t.prototype.getUint64AsNumber = function () {
          var t = this.getUint32();
          return 4294967296 * (this.getUint32() >>> 0) + (t >>> 0);
        }),
        (t.prototype.pushVaruint32 = function (t) {
          for (;;) {
            if (!(t >>> 7)) {
              this.push(t);
              break;
            }
            this.push(128 | (127 & t)), (t >>>= 7);
          }
        }),
        (t.prototype.getVaruint32 = function () {
          for (var t = 0, e = 0; ; ) {
            var r = this.get();
            if (((t |= (127 & r) << e), (e += 7), !(128 & r))) break;
          }
          return t >>> 0;
        }),
        (t.prototype.pushVarint32 = function (t) {
          this.pushVaruint32((t << 1) ^ (t >> 31));
        }),
        (t.prototype.getVarint32 = function () {
          var t = this.getVaruint32();
          return 1 & t ? (~t >> 1) | 2147483648 : t >>> 1;
        }),
        (t.prototype.pushFloat32 = function (t) {
          this.pushArray(new Uint8Array(new Float32Array([t]).buffer));
        }),
        (t.prototype.getFloat32 = function () {
          return new Float32Array(this.getUint8Array(4).slice().buffer)[0];
        }),
        (t.prototype.pushFloat64 = function (t) {
          this.pushArray(new Uint8Array(new Float64Array([t]).buffer));
        }),
        (t.prototype.getFloat64 = function () {
          return new Float64Array(this.getUint8Array(8).slice().buffer)[0];
        }),
        (t.prototype.pushName = function (t) {
          if ("string" != typeof t)
            throw new Error("Expected string containing name");
          if (!new RegExp(/^[.1-5a-z]{0,12}[.1-5a-j]?$/).test(t))
            throw new Error(
              "Name should be less than 13 characters, or less than 14 if last character is between 1-5 or a-j, and only contain the following symbols .12345abcdefghijklmnopqrstuvwxyz"
            );
          for (
            var e = function (t) {
                return t >= "a".charCodeAt(0) && t <= "z".charCodeAt(0)
                  ? t - "a".charCodeAt(0) + 6
                  : t >= "1".charCodeAt(0) && t <= "5".charCodeAt(0)
                  ? t - "1".charCodeAt(0) + 1
                  : 0;
              },
              r = new Uint8Array(8),
              i = 63,
              n = 0;
            n < t.length;
            ++n
          ) {
            var a = e(t.charCodeAt(n));
            i < 5 && (a <<= 1);
            for (var o = 4; o >= 0; --o)
              i >= 0 &&
                ((r[Math.floor(i / 8)] |= ((a >> o) & 1) << i % 8), --i);
          }
          this.pushArray(r);
        }),
        (t.prototype.getName = function () {
          for (var t = this.getUint8Array(8), e = "", r = 63; r >= 0; ) {
            for (var i = 0, n = 0; n < 5; ++n)
              r >= 0 &&
                ((i = (i << 1) | ((t[Math.floor(r / 8)] >> r % 8) & 1)), --r);
            e +=
              i >= 6
                ? String.fromCharCode(i + "a".charCodeAt(0) - 6)
                : i >= 1
                ? String.fromCharCode(i + "1".charCodeAt(0) - 1)
                : ".";
          }
          for (; e.endsWith("."); ) e = e.substr(0, e.length - 1);
          return e;
        }),
        (t.prototype.pushBytes = function (t) {
          this.pushVaruint32(t.length), this.pushArray(t);
        }),
        (t.prototype.getBytes = function () {
          return this.getUint8Array(this.getVaruint32());
        }),
        (t.prototype.pushString = function (t) {
          this.pushBytes(this.textEncoder.encode(t));
        }),
        (t.prototype.getString = function () {
          return this.textDecoder.decode(this.getBytes());
        }),
        (t.prototype.pushSymbolCode = function (t) {
          if ("string" != typeof t)
            throw new Error("Expected string containing symbol_code");
          var e = [];
          for (
            e.push.apply(e, a([], n(this.textEncoder.encode(t))));
            e.length < 8;

          )
            e.push(0);
          this.pushArray(e.slice(0, 8));
        }),
        (t.prototype.getSymbolCode = function () {
          var t,
            e = this.getUint8Array(8);
          for (t = 0; t < e.length && e[t]; ++t);
          return this.textDecoder.decode(
            new Uint8Array(e.buffer, e.byteOffset, t)
          );
        }),
        (t.prototype.pushSymbol = function (t) {
          var e = t.name,
            r = t.precision;
          if (!/^[A-Z]{1,7}$/.test(e))
            throw new Error(
              "Expected symbol to be A-Z and between one and seven characters"
            );
          var i = [255 & r];
          for (
            i.push.apply(i, a([], n(this.textEncoder.encode(e))));
            i.length < 8;

          )
            i.push(0);
          this.pushArray(i.slice(0, 8));
        }),
        (t.prototype.getSymbol = function () {
          var t,
            e = this.get(),
            r = this.getUint8Array(7);
          for (t = 0; t < r.length && r[t]; ++t);
          return {
            name: this.textDecoder.decode(
              new Uint8Array(r.buffer, r.byteOffset, t)
            ),
            precision: e,
          };
        }),
        (t.prototype.pushAsset = function (t) {
          if ("string" != typeof t)
            throw new Error("Expected string containing asset");
          var e = 0,
            r = "",
            i = 0;
          "-" === (t = t.trim())[e] && ((r += "-"), ++e);
          for (
            var n = !1;
            e < t.length &&
            t.charCodeAt(e) >= "0".charCodeAt(0) &&
            t.charCodeAt(e) <= "9".charCodeAt(0);

          )
            (n = !0), (r += t[e]), ++e;
          if (!n) throw new Error("Asset must begin with a number");
          if ("." === t[e])
            for (
              ++e;
              e < t.length &&
              t.charCodeAt(e) >= "0".charCodeAt(0) &&
              t.charCodeAt(e) <= "9".charCodeAt(0);

            )
              (r += t[e]), ++i, ++e;
          var a = t.substr(e).trim();
          this.pushArray(s.signedDecimalToBinary(8, r)),
            this.pushSymbol({ name: a, precision: i });
        }),
        (t.prototype.getAsset = function () {
          var t = this.getUint8Array(8),
            e = this.getSymbol(),
            r = e.name,
            i = e.precision,
            n = s.signedBinaryToDecimal(t, i + 1);
          return (
            i && (n = n.substr(0, n.length - i) + "." + n.substr(n.length - i)),
            n + " " + r
          );
        }),
        (t.prototype.pushPublicKey = function (t) {
          var e = s.stringToPublicKey(t);
          this.push(e.type), this.pushArray(e.data);
        }),
        (t.prototype.getPublicKey = function () {
          var t,
            e = this.get();
          if (e === s.KeyType.wa) {
            var r = this.readPos;
            this.skip(34),
              this.skip(this.getVaruint32()),
              (t = new Uint8Array(
                this.array.buffer,
                this.array.byteOffset + r,
                this.readPos - r
              ));
          } else t = this.getUint8Array(s.publicKeyDataSize);
          return s.publicKeyToString({ type: e, data: t });
        }),
        (t.prototype.pushPrivateKey = function (t) {
          var e = s.stringToPrivateKey(t);
          this.push(e.type), this.pushArray(e.data);
        }),
        (t.prototype.getPrivateKey = function () {
          var t = this.get(),
            e = this.getUint8Array(s.privateKeyDataSize);
          return s.privateKeyToString({ type: t, data: e });
        }),
        (t.prototype.pushSignature = function (t) {
          var e = s.stringToSignature(t);
          this.push(e.type), this.pushArray(e.data);
        }),
        (t.prototype.getSignature = function () {
          var t,
            e = this.get();
          if (e === s.KeyType.wa) {
            var r = this.readPos;
            this.skip(65),
              this.skip(this.getVaruint32()),
              this.skip(this.getVaruint32()),
              (t = new Uint8Array(
                this.array.buffer,
                this.array.byteOffset + r,
                this.readPos - r
              ));
          } else t = this.getUint8Array(s.signatureDataSize);
          return s.signatureToString({ type: e, data: t });
        }),
        t
      );
    })();
    e.SerialBuffer = u;
    e.supportedAbiVersion = function (t) {
      return t.startsWith("eosio::abi/1.");
    };
    var h = function (t) {
      var e = Date.parse(t);
      if (Number.isNaN(e)) throw new Error("Invalid time format");
      return e;
    };
    e.dateToTimePoint = function (t) {
      return Math.round(1e3 * h(t + "Z"));
    };
    e.timePointToDate = function (t) {
      var e = new Date(t / 1e3).toISOString();
      return e.substr(0, e.length - 1);
    };
    e.dateToTimePointSec = function (t) {
      return Math.round(h(t + "Z") / 1e3);
    };
    e.timePointSecToDate = function (t) {
      var e = new Date(1e3 * t).toISOString();
      return e.substr(0, e.length - 1);
    };
    e.dateToBlockTimestamp = function (t) {
      return Math.round((h(t + "Z") - 9466848e5) / 500);
    };
    e.blockTimestampToDate = function (t) {
      var e = new Date(500 * t + 9466848e5).toISOString();
      return e.substr(0, e.length - 1);
    };
    e.stringToSymbol = function (t) {
      if ("string" != typeof t)
        throw new Error("Expected string containing symbol");
      var e = t.match(/^([0-9]+),([A-Z]+)$/);
      if (!e) throw new Error("Invalid symbol");
      return { name: e[2], precision: +e[1] };
    };
    e.symbolToString = function (t) {
      var e = t.name;
      return t.precision + "," + e;
    };
    e.arrayToHex = function (t) {
      var e,
        r,
        i = "";
      try {
        for (var n = o(t), a = n.next(); !a.done; a = n.next()) {
          i += ("00" + a.value.toString(16)).slice(-2);
        }
      } catch (t) {
        e = { error: t };
      } finally {
        try {
          a && !a.done && (r = n.return) && r.call(n);
        } finally {
          if (e) throw e.error;
        }
      }
      return i.toUpperCase();
    };
    function c(t, e) {
      throw new Error("Don't know how to serialize " + this.name);
    }
    function d(t) {
      throw new Error("Don't know how to deserialize " + this.name);
    }
    function l(t, e, r, i) {
      var n, a;
      if (
        (void 0 === r && (r = new f()),
        void 0 === i && (i = !0),
        "object" != typeof e)
      )
        throw new Error(
          "expected object containing data: " + JSON.stringify(e)
        );
      this.base && this.base.serialize(t, e, r, i);
      try {
        for (var s = o(this.fields), u = s.next(); !u.done; u = s.next()) {
          var h = u.value;
          if (h.name in e) {
            if (r.skippedBinaryExtension)
              throw new Error("unexpected " + this.name + "." + h.name);
            h.type.serialize(
              t,
              e[h.name],
              r,
              i && h === this.fields[this.fields.length - 1]
            );
          } else {
            if (!i || !h.type.extensionOf)
              throw new Error(
                "missing " +
                  this.name +
                  "." +
                  h.name +
                  " (type=" +
                  h.type.name +
                  ")"
              );
            r.skippedBinaryExtension = !0;
          }
        }
      } catch (t) {
        n = { error: t };
      } finally {
        try {
          u && !u.done && (a = s.return) && a.call(s);
        } finally {
          if (n) throw n.error;
        }
      }
    }
    function p(t, e, r) {
      var i, n, a;
      void 0 === e && (e = new f()),
        void 0 === r && (r = !0),
        (a = this.base ? this.base.deserialize(t, e, r) : {});
      try {
        for (var s = o(this.fields), u = s.next(); !u.done; u = s.next()) {
          var h = u.value;
          r && h.type.extensionOf && !t.haveReadData()
            ? (e.skippedBinaryExtension = !0)
            : (a[h.name] = h.type.deserialize(t, e, r));
        }
      } catch (t) {
        i = { error: t };
      } finally {
        try {
          u && !u.done && (n = s.return) && n.call(s);
        } finally {
          if (i) throw i.error;
        }
      }
      return a;
    }
    function b(t, e, r, i) {
      if (!Array.isArray(e) || 2 !== e.length || "string" != typeof e[0])
        throw new Error('expected variant: ["type", value]');
      var n = this.fields.findIndex(function (t) {
        return t.name === e[0];
      });
      if (n < 0)
        throw new Error('type "' + e[0] + '" is not valid for variant');
      t.pushVaruint32(n), this.fields[n].type.serialize(t, e[1], r, i);
    }
    function m(t, e, r) {
      var i = t.getVaruint32();
      if (i >= this.fields.length)
        throw new Error("type index " + i + " is not valid for variant");
      var n = this.fields[i];
      return [n.name, n.type.deserialize(t, e, r)];
    }
    function y(t, e, r, i) {
      var n, a;
      t.pushVaruint32(e.length);
      try {
        for (var s = o(e), f = s.next(); !f.done; f = s.next()) {
          var u = f.value;
          this.arrayOf.serialize(t, u, r, !1);
        }
      } catch (t) {
        n = { error: t };
      } finally {
        try {
          f && !f.done && (a = s.return) && a.call(s);
        } finally {
          if (n) throw n.error;
        }
      }
    }
    function v(t, e, r) {
      for (var i = t.getVaruint32(), n = [], a = 0; a < i; ++a)
        n.push(this.arrayOf.deserialize(t, e, !1));
      return n;
    }
    function g(t, e, r, i) {
      null == e
        ? t.push(0)
        : (t.push(1), this.optionalOf.serialize(t, e, r, i));
    }
    function w(t, e, r) {
      return t.get() ? this.optionalOf.deserialize(t, e, r) : null;
    }
    function _(t, e, r, i) {
      this.extensionOf.serialize(t, e, r, i);
    }
    function M(t, e, r) {
      return this.extensionOf.deserialize(t, e, r);
    }
    function A(t, e, r, i) {
      var a,
        s,
        f = Object.entries(e);
      t.pushVaruint32(f.length);
      try {
        for (var u = o(f), h = u.next(); !h.done; h = u.next()) {
          var c = n(h.value, 2),
            d = c[0],
            l = c[1],
            p = this.fields[0].type,
            b = this.fields[1].type;
          p.serialize(t, d, r, i), b.serialize(t, l, r, i);
        }
      } catch (t) {
        a = { error: t };
      } finally {
        try {
          h && !h.done && (s = u.return) && s.call(u);
        } finally {
          if (a) throw a.error;
        }
      }
    }
    function x(t, e, r) {
      for (var i = t.getVaruint32(), n = {}, a = 0; a < i; ++a) {
        var o = this.fields[0].type,
          s = this.fields[1].type;
        n[o.deserialize(t, e, r)] = s.deserialize(t, e, r);
      }
      return n;
    }
    function S(t, e, r, i) {
      var n = this;
      t.pushVaruint32(e.length),
        e.forEach(function (e) {
          n.fields[0].type.serialize(t, e[0], r, i),
            n.fields[1].type.serialize(t, e[1], r, i);
        });
    }
    function k(t, e, r) {
      for (var i = [], n = t.getVaruint32(), a = 0; a < n; ++a)
        i.push(this.fields[0].type.deserialize(t, e, r)),
          i.push(this.fields[1].type.deserialize(t, e, r));
      return i;
    }
    e.hexToUint8Array = function (t) {
      if ("string" != typeof t)
        throw new Error("Expected string containing hex digits");
      if (t.length % 2) throw new Error("Odd number of hex digits");
      for (var e = t.length / 2, r = new Uint8Array(e), i = 0; i < e; ++i) {
        var n = parseInt(t.substr(2 * i, 2), 16);
        if (Number.isNaN(n)) throw new Error("Expected hex string");
        r[i] = n;
      }
      return r;
    };
    var z = function (t) {
        return i(
          {
            name: "<missing name>",
            aliasOfName: "",
            arrayOf: null,
            optionalOf: null,
            extensionOf: null,
            baseName: "",
            base: null,
            fields: [],
            serialize: c,
            deserialize: d,
          },
          t
        );
      },
      E = function (t, e) {
        if (
          Number.isNaN(+t) ||
          Number.isNaN(+e) ||
          ("number" != typeof t && "string" != typeof t)
        )
          throw new Error("Expected number");
        if (+t != +e) throw new Error("Number is out of range");
        return +t;
      };
    e.createInitialTypes = function () {
      var t = new Map(
        Object.entries({
          bool: z({
            name: "bool",
            serialize: function (t, e) {
              if (
                "boolean" != typeof e &&
                ("number" != typeof e || (1 !== e && 0 !== e))
              )
                throw new Error("Expected boolean or number equal to 1 or 0");
              t.push(e ? 1 : 0);
            },
            deserialize: function (t) {
              return !!t.get();
            },
          }),
          uint8: z({
            name: "uint8",
            serialize: function (t, e) {
              t.push(E(e, 255 & e));
            },
            deserialize: function (t) {
              return t.get();
            },
          }),
          int8: z({
            name: "int8",
            serialize: function (t, e) {
              t.push(E(e, (e << 24) >> 24));
            },
            deserialize: function (t) {
              return (t.get() << 24) >> 24;
            },
          }),
          uint16: z({
            name: "uint16",
            serialize: function (t, e) {
              t.pushUint16(E(e, 65535 & e));
            },
            deserialize: function (t) {
              return t.getUint16();
            },
          }),
          int16: z({
            name: "int16",
            serialize: function (t, e) {
              t.pushUint16(E(e, (e << 16) >> 16));
            },
            deserialize: function (t) {
              return (t.getUint16() << 16) >> 16;
            },
          }),
          uint32: z({
            name: "uint32",
            serialize: function (t, e) {
              t.pushUint32(E(e, e >>> 0));
            },
            deserialize: function (t) {
              return t.getUint32();
            },
          }),
          uint64: z({
            name: "uint64",
            serialize: function (t, e) {
              t.pushArray(s.decimalToBinary(8, "" + e));
            },
            deserialize: function (t) {
              return s.binaryToDecimal(t.getUint8Array(8));
            },
          }),
          int64: z({
            name: "int64",
            serialize: function (t, e) {
              t.pushArray(s.signedDecimalToBinary(8, "" + e));
            },
            deserialize: function (t) {
              return s.signedBinaryToDecimal(t.getUint8Array(8));
            },
          }),
          int32: z({
            name: "int32",
            serialize: function (t, e) {
              t.pushUint32(E(e, 0 | e));
            },
            deserialize: function (t) {
              return 0 | t.getUint32();
            },
          }),
          varuint32: z({
            name: "varuint32",
            serialize: function (t, e) {
              t.pushVaruint32(E(e, e >>> 0));
            },
            deserialize: function (t) {
              return t.getVaruint32();
            },
          }),
          varint32: z({
            name: "varint32",
            serialize: function (t, e) {
              t.pushVarint32(E(e, 0 | e));
            },
            deserialize: function (t) {
              return t.getVarint32();
            },
          }),
          uint128: z({
            name: "uint128",
            serialize: function (t, e) {
              t.pushArray(s.decimalToBinary(16, "" + e));
            },
            deserialize: function (t) {
              return s.binaryToDecimal(t.getUint8Array(16));
            },
          }),
          int128: z({
            name: "int128",
            serialize: function (t, e) {
              t.pushArray(s.signedDecimalToBinary(16, "" + e));
            },
            deserialize: function (t) {
              return s.signedBinaryToDecimal(t.getUint8Array(16));
            },
          }),
          float32: z({
            name: "float32",
            serialize: function (t, e) {
              t.pushFloat32(e);
            },
            deserialize: function (t) {
              return t.getFloat32();
            },
          }),
          float64: z({
            name: "float64",
            serialize: function (t, e) {
              t.pushFloat64(e);
            },
            deserialize: function (t) {
              return t.getFloat64();
            },
          }),
          float128: z({
            name: "float128",
            serialize: function (t, r) {
              t.pushUint8ArrayChecked(e.hexToUint8Array(r), 16);
            },
            deserialize: function (t) {
              return e.arrayToHex(t.getUint8Array(16));
            },
          }),
          bytes: z({
            name: "bytes",
            serialize: function (t, r) {
              r instanceof Uint8Array || Array.isArray(r)
                ? t.pushBytes(r)
                : t.pushBytes(e.hexToUint8Array(r));
            },
            deserialize: function (t, r) {
              return r && r.options.bytesAsUint8Array
                ? t.getBytes()
                : e.arrayToHex(t.getBytes());
            },
          }),
          string: z({
            name: "string",
            serialize: function (t, e) {
              t.pushString(e);
            },
            deserialize: function (t) {
              return t.getString();
            },
          }),
          name: z({
            name: "name",
            serialize: function (t, e) {
              t.pushName(e);
            },
            deserialize: function (t) {
              return t.getName();
            },
          }),
          time_point: z({
            name: "time_point",
            serialize: function (t, r) {
              t.pushNumberAsUint64(e.dateToTimePoint(r));
            },
            deserialize: function (t) {
              return e.timePointToDate(t.getUint64AsNumber());
            },
          }),
          time_point_sec: z({
            name: "time_point_sec",
            serialize: function (t, r) {
              t.pushUint32(e.dateToTimePointSec(r));
            },
            deserialize: function (t) {
              return e.timePointSecToDate(t.getUint32());
            },
          }),
          block_timestamp_type: z({
            name: "block_timestamp_type",
            serialize: function (t, r) {
              t.pushUint32(e.dateToBlockTimestamp(r));
            },
            deserialize: function (t) {
              return e.blockTimestampToDate(t.getUint32());
            },
          }),
          symbol_code: z({
            name: "symbol_code",
            serialize: function (t, e) {
              t.pushSymbolCode(e);
            },
            deserialize: function (t) {
              return t.getSymbolCode();
            },
          }),
          symbol: z({
            name: "symbol",
            serialize: function (t, r) {
              t.pushSymbol(e.stringToSymbol(r));
            },
            deserialize: function (t) {
              return e.symbolToString(t.getSymbol());
            },
          }),
          asset: z({
            name: "asset",
            serialize: function (t, e) {
              t.pushAsset(e);
            },
            deserialize: function (t) {
              return t.getAsset();
            },
          }),
          checksum160: z({
            name: "checksum160",
            serialize: function (t, r) {
              t.pushUint8ArrayChecked(e.hexToUint8Array(r), 20);
            },
            deserialize: function (t) {
              return e.arrayToHex(t.getUint8Array(20));
            },
          }),
          checksum256: z({
            name: "checksum256",
            serialize: function (t, r) {
              t.pushUint8ArrayChecked(e.hexToUint8Array(r), 32);
            },
            deserialize: function (t) {
              return e.arrayToHex(t.getUint8Array(32));
            },
          }),
          checksum512: z({
            name: "checksum512",
            serialize: function (t, r) {
              t.pushUint8ArrayChecked(e.hexToUint8Array(r), 64);
            },
            deserialize: function (t) {
              return e.arrayToHex(t.getUint8Array(64));
            },
          }),
          public_key: z({
            name: "public_key",
            serialize: function (t, e) {
              t.pushPublicKey(e);
            },
            deserialize: function (t) {
              return t.getPublicKey();
            },
          }),
          private_key: z({
            name: "private_key",
            serialize: function (t, e) {
              t.pushPrivateKey(e);
            },
            deserialize: function (t) {
              return t.getPrivateKey();
            },
          }),
          signature: z({
            name: "signature",
            serialize: function (t, e) {
              t.pushSignature(e);
            },
            deserialize: function (t) {
              return t.getSignature();
            },
          }),
        })
      );
      return (
        t.set(
          "extended_asset",
          z({
            name: "extended_asset",
            baseName: "",
            fields: [
              { name: "quantity", typeName: "asset", type: t.get("asset") },
              { name: "contract", typeName: "name", type: t.get("name") },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t
      );
    };
    e.createAbiTypes = function () {
      var t = e.createInitialTypes();
      return (
        t.set(
          "extensions_entry",
          z({
            name: "extensions_entry",
            baseName: "",
            fields: [
              { name: "tag", typeName: "uint16", type: null },
              { name: "value", typeName: "bytes", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "type_def",
          z({
            name: "type_def",
            baseName: "",
            fields: [
              { name: "new_type_name", typeName: "string", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "field_def",
          z({
            name: "field_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "struct_def",
          z({
            name: "struct_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "base", typeName: "string", type: null },
              { name: "fields", typeName: "field_def[]", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "action_def",
          z({
            name: "action_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "type", typeName: "string", type: null },
              { name: "ricardian_contract", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "table_def",
          z({
            name: "table_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "index_type", typeName: "string", type: null },
              { name: "key_names", typeName: "string[]", type: null },
              { name: "key_types", typeName: "string[]", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "clause_pair",
          z({
            name: "clause_pair",
            baseName: "",
            fields: [
              { name: "id", typeName: "string", type: null },
              { name: "body", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "error_message",
          z({
            name: "error_message",
            baseName: "",
            fields: [
              { name: "error_code", typeName: "uint64", type: null },
              { name: "error_msg", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "variant_def",
          z({
            name: "variant_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "string", type: null },
              { name: "types", typeName: "string[]", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "action_result",
          z({
            name: "action_result",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "result_type", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "primary_key_index_def",
          z({
            name: "primary_key_index_def",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              { name: "type", typeName: "string", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "secondary_index_def",
          z({
            name: "secondary_index_def",
            baseName: "",
            fields: [{ name: "type", typeName: "string", type: null }],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "secondary_indices",
          z({
            name: "secondary_indices",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              {
                name: "secondary_index_def",
                typeName: "secondary_index_def",
                type: null,
              },
            ],
            serialize: A,
            deserialize: x,
          })
        ),
        t.set(
          "kv_table_entry_def",
          z({
            name: "kv_table_entry_def",
            baseName: "",
            fields: [
              { name: "type", typeName: "string", type: null },
              {
                name: "primary_index",
                typeName: "primary_key_index_def",
                type: null,
              },
              {
                name: "secondary_indices",
                typeName: "secondary_indices",
                type: null,
              },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "kv_table",
          z({
            name: "kv_table",
            baseName: "",
            fields: [
              { name: "name", typeName: "name", type: null },
              {
                name: "kv_table_entry_def",
                typeName: "kv_table_entry_def",
                type: null,
              },
            ],
            serialize: A,
            deserialize: x,
          })
        ),
        t.set(
          "abi_def",
          z({
            name: "abi_def",
            baseName: "",
            fields: [
              { name: "version", typeName: "string", type: null },
              { name: "types", typeName: "type_def[]", type: null },
              { name: "structs", typeName: "struct_def[]", type: null },
              { name: "actions", typeName: "action_def[]", type: null },
              { name: "tables", typeName: "table_def[]", type: null },
              {
                name: "ricardian_clauses",
                typeName: "clause_pair[]",
                type: null,
              },
              {
                name: "error_messages",
                typeName: "error_message[]",
                type: null,
              },
              {
                name: "abi_extensions",
                typeName: "extensions_entry[]",
                type: null,
              },
              { name: "variants", typeName: "variant_def[]$", type: null },
              {
                name: "action_results",
                typeName: "action_result[]$",
                type: null,
              },
              { name: "kv_tables", typeName: "kv_table$", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t
      );
    };
    e.createTransactionExtensionTypes = function () {
      var t = e.createInitialTypes();
      return (
        t.set(
          "resource_payer",
          z({
            name: "resource_payer",
            baseName: "",
            fields: [
              { name: "payer", typeName: "name", type: null },
              { name: "max_net_bytes", typeName: "uint64", type: null },
              { name: "max_cpu_us", typeName: "uint64", type: null },
              { name: "max_memory_bytes", typeName: "uint64", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t
      );
    };
    e.createTransactionTypes = function () {
      var t = e.createInitialTypes();
      return (
        t.set(
          "permission_level",
          z({
            name: "permission_level",
            baseName: "",
            fields: [
              { name: "actor", typeName: "name", type: null },
              { name: "permission", typeName: "name", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "action",
          z({
            name: "action",
            baseName: "",
            fields: [
              { name: "account", typeName: "name", type: null },
              { name: "name", typeName: "name", type: null },
              {
                name: "authorization",
                typeName: "permission_level[]",
                type: null,
              },
              { name: "data", typeName: "bytes", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "extension",
          z({
            name: "extension",
            baseName: "",
            fields: [
              { name: "type", typeName: "uint16", type: null },
              { name: "data", typeName: "bytes", type: null },
            ],
            serialize: S,
            deserialize: k,
          })
        ),
        t.set(
          "transaction_header",
          z({
            name: "transaction_header",
            baseName: "",
            fields: [
              { name: "expiration", typeName: "time_point_sec", type: null },
              { name: "ref_block_num", typeName: "uint16", type: null },
              { name: "ref_block_prefix", typeName: "uint32", type: null },
              {
                name: "max_net_usage_words",
                typeName: "varuint32",
                type: null,
              },
              { name: "max_cpu_usage_ms", typeName: "uint8", type: null },
              { name: "delay_sec", typeName: "varuint32", type: null },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t.set(
          "transaction",
          z({
            name: "transaction",
            baseName: "transaction_header",
            fields: [
              {
                name: "context_free_actions",
                typeName: "action[]",
                type: null,
              },
              { name: "actions", typeName: "action[]", type: null },
              {
                name: "transaction_extensions",
                typeName: "extension",
                type: null,
              },
            ],
            serialize: l,
            deserialize: p,
          })
        ),
        t
      );
    };
    e.getType = function (t, r) {
      var i = t.get(r);
      if (i && i.aliasOfName) return e.getType(t, i.aliasOfName);
      if (i) return i;
      if (r.endsWith("[]"))
        return z({
          name: r,
          arrayOf: e.getType(t, r.substr(0, r.length - 2)),
          serialize: y,
          deserialize: v,
        });
      if (r.endsWith("?"))
        return z({
          name: r,
          optionalOf: e.getType(t, r.substr(0, r.length - 1)),
          serialize: g,
          deserialize: w,
        });
      if (r.endsWith("$"))
        return z({
          name: r,
          extensionOf: e.getType(t, r.substr(0, r.length - 1)),
          serialize: _,
          deserialize: M,
        });
      throw new Error("Unknown type: " + r);
    };
    e.getTypesFromAbi = function (t, r) {
      var i,
        a,
        s,
        f,
        u,
        h,
        c,
        d,
        y,
        v,
        g = new Map(t);
      if (r && r.types)
        try {
          for (var w = o(r.types), _ = w.next(); !_.done; _ = w.next()) {
            var M = _.value,
              A = M.new_type_name,
              x = M.type;
            g.set(A, z({ name: A, aliasOfName: x }));
          }
        } catch (t) {
          i = { error: t };
        } finally {
          try {
            _ && !_.done && (a = w.return) && a.call(w);
          } finally {
            if (i) throw i.error;
          }
        }
      if (r && r.structs)
        try {
          for (var S = o(r.structs), k = S.next(); !k.done; k = S.next()) {
            var E = k.value,
              T = E.name,
              R = E.base,
              P = E.fields;
            g.set(
              T,
              z({
                name: T,
                baseName: R,
                fields: P.map(function (t) {
                  return { name: t.name, typeName: t.type, type: null };
                }),
                serialize: l,
                deserialize: p,
              })
            );
          }
        } catch (t) {
          s = { error: t };
        } finally {
          try {
            k && !k.done && (f = S.return) && f.call(S);
          } finally {
            if (s) throw s.error;
          }
        }
      if (r && r.variants)
        try {
          for (var I = o(r.variants), N = I.next(); !N.done; N = I.next()) {
            var U = N.value,
              B = U.name,
              O = U.types;
            g.set(
              B,
              z({
                name: B,
                fields: O.map(function (t) {
                  return { name: t, typeName: t, type: null };
                }),
                serialize: b,
                deserialize: m,
              })
            );
          }
        } catch (t) {
          u = { error: t };
        } finally {
          try {
            N && !N.done && (h = I.return) && h.call(I);
          } finally {
            if (u) throw u.error;
          }
        }
      try {
        for (var D = o(g), L = D.next(); !L.done; L = D.next()) {
          var K = n(L.value, 2);
          K[0];
          (x = K[1]).baseName && (x.base = e.getType(g, x.baseName));
          try {
            for (
              var C = ((y = void 0), o(x.fields)), j = C.next();
              !j.done;
              j = C.next()
            ) {
              var q = j.value;
              q.type = e.getType(g, q.typeName);
            }
          } catch (t) {
            y = { error: t };
          } finally {
            try {
              j && !j.done && (v = C.return) && v.call(C);
            } finally {
              if (y) throw y.error;
            }
          }
        }
      } catch (t) {
        c = { error: t };
      } finally {
        try {
          L && !L.done && (d = D.return) && d.call(D);
        } finally {
          if (c) throw c.error;
        }
      }
      return g;
    };
    e.transactionHeader = function (t, r) {
      var i,
        n = t.header ? t.header.timestamp : t.timestamp,
        a = parseInt(
          (i = t.id.substr(16, 8)).substr(6, 2) +
            i.substr(4, 2) +
            i.substr(2, 2) +
            i.substr(0, 2),
          16
        );
      return {
        expiration: e.timePointSecToDate(e.dateToTimePointSec(n) + r),
        ref_block_num: 65535 & t.block_num,
        ref_block_prefix: a,
      };
    };
    e.serializeActionData = function (t, r, i, n, a, o) {
      var s = t.actions.get(i);
      if (!s) throw new Error("Unknown action " + i + " in contract " + r);
      var f = new u({ textEncoder: a, textDecoder: o });
      return s.serialize(f, n), e.arrayToHex(f.asUint8Array());
    };
    e.serializeAction = function (t, r, i, n, a, o, s) {
      return {
        account: r,
        name: i,
        authorization: n,
        data: e.serializeActionData(t, r, i, a, o, s),
      };
    };
    e.deserializeActionData = function (t, r, i, n, a, o) {
      var s = t.actions.get(i);
      if (("string" == typeof n && (n = e.hexToUint8Array(n)), !s))
        throw new Error("Unknown action " + i + " in contract " + r);
      var f = new u({ textDecoder: o, textEncoder: a });
      return f.pushArray(n), s.deserialize(f);
    };
    e.deserializeAction = function (t, r, i, n, a, o, s) {
      return {
        account: r,
        name: i,
        authorization: n,
        data: e.deserializeActionData(t, r, i, a, o, s),
      };
    };
    e.serializeAnyvar = function (t, e) {
      var r, i, a, o, s, f, u, h, c;
      null === e
        ? ((h = (r = n([P.null_t, e], 2))[0]), (c = r[1]))
        : "string" == typeof e
        ? ((h = (i = n([P.string, e], 2))[0]), (c = i[1]))
        : "number" == typeof e
        ? ((h = (a = n([P.int32, e], 2))[0]), (c = a[1]))
        : e instanceof Uint8Array
        ? ((h = (o = n([P.bytes, e], 2))[0]), (c = o[1]))
        : Array.isArray(e)
        ? ((h = (s = n([P.any_array, e], 2))[0]), (c = s[1]))
        : 2 === Object.keys(e).length &&
          e.hasOwnProperty("type") &&
          e.hasOwnProperty("value")
        ? ((h = (f = n([P[e.type], e.value], 2))[0]), (c = f[1]))
        : ((h = (u = n([P.any_object, e], 2))[0]), (c = u[1])),
        t.pushVaruint32(h.index),
        h.type.serialize(t, c);
    };
    e.deserializeAnyvar = function (t, e) {
      var r = t.getVaruint32();
      if (r >= I.length)
        throw new Error("Tried to deserialize unknown anyvar type");
      var i = I[r],
        n = i.type.deserialize(t, e);
      return (e && e.options.useShortForm) || i.useShortForm
        ? n
        : { type: i.type.name, value: n };
    };
    e.deserializeAnyvarShort = function (t) {
      return e.deserializeAnyvar(t, new f({ useShortForm: !0 }));
    };
    e.serializeAnyObject = function (t, r) {
      var i,
        a,
        s = Object.entries(r);
      t.pushVaruint32(s.length);
      try {
        for (var f = o(s), u = f.next(); !u.done; u = f.next()) {
          var h = n(u.value, 2),
            c = h[0],
            d = h[1];
          t.pushString(c), e.serializeAnyvar(t, d);
        }
      } catch (t) {
        i = { error: t };
      } finally {
        try {
          u && !u.done && (a = f.return) && a.call(f);
        } finally {
          if (i) throw i.error;
        }
      }
    };
    e.deserializeAnyObject = function (t, r) {
      for (var i = t.getVaruint32(), n = {}, a = 0; a < i; ++a) {
        var o = t.getString();
        if (o in n) {
          for (var s = 1; o + "_" + s in n; ) ++s;
          o = o + "_" + s;
        }
        n[o] = e.deserializeAnyvar(t, r);
      }
      return n;
    };
    e.serializeAnyArray = function (t, r) {
      var i, n;
      t.pushVaruint32(r.length);
      try {
        for (var a = o(r), s = a.next(); !s.done; s = a.next()) {
          var f = s.value;
          e.serializeAnyvar(t, f);
        }
      } catch (t) {
        i = { error: t };
      } finally {
        try {
          s && !s.done && (n = a.return) && n.call(a);
        } finally {
          if (i) throw i.error;
        }
      }
    };
    e.deserializeAnyArray = function (t, r) {
      for (var i = t.getVaruint32(), n = [], a = 0; a < i; ++a)
        n.push(e.deserializeAnyvar(t, r));
      return n;
    };
    var T,
      R =
        ((T = e.createInitialTypes()).set(
          "null_t",
          z({
            name: "null_t",
            serialize: function (t, e) {},
            deserialize: function (t, e) {},
          })
        ),
        T.set(
          "any_object",
          z({
            name: "any_object",
            serialize: e.serializeAnyObject,
            deserialize: e.deserializeAnyObject,
          })
        ),
        T.set(
          "any_array",
          z({
            name: "any_array",
            serialize: e.serializeAnyArray,
            deserialize: e.deserializeAnyArray,
          })
        ),
        T),
      P = {
        null_t: { index: 0, useShortForm: !0, type: R.get("null_t") },
        int64: { index: 1, useShortForm: !1, type: R.get("int64") },
        uint64: { index: 2, useShortForm: !1, type: R.get("uint64") },
        int32: { index: 3, useShortForm: !0, type: R.get("int32") },
        uint32: { index: 4, useShortForm: !1, type: R.get("uint32") },
        int16: { index: 5, useShortForm: !1, type: R.get("int16") },
        uint16: { index: 6, useShortForm: !1, type: R.get("uint16") },
        int8: { index: 7, useShortForm: !1, type: R.get("int8") },
        uint8: { index: 8, useShortForm: !1, type: R.get("uint8") },
        time_point: { index: 9, useShortForm: !1, type: R.get("time_point") },
        checksum256: {
          index: 10,
          useShortForm: !1,
          type: R.get("checksum256"),
        },
        float64: { index: 11, useShortForm: !1, type: R.get("float64") },
        string: { index: 12, useShortForm: !0, type: R.get("string") },
        any_object: { index: 13, useShortForm: !0, type: R.get("any_object") },
        any_array: { index: 14, useShortForm: !0, type: R.get("any_array") },
        bytes: { index: 15, useShortForm: !1, type: R.get("bytes") },
        symbol: { index: 16, useShortForm: !1, type: R.get("symbol") },
        symbol_code: {
          index: 17,
          useShortForm: !1,
          type: R.get("symbol_code"),
        },
        asset: { index: 18, useShortForm: !1, type: R.get("asset") },
      },
      I = [
        P.null_t,
        P.int64,
        P.uint64,
        P.int32,
        P.uint32,
        P.int16,
        P.uint16,
        P.int8,
        P.uint8,
        P.time_point,
        P.checksum256,
        P.float64,
        P.string,
        P.any_object,
        P.any_array,
        P.bytes,
        P.symbol,
        P.symbol_code,
        P.asset,
      ];
    e.serializeQuery = function (t, r) {
      var i, a, s, f, u, h, c, d;
      if (
        ("string" == typeof r
          ? (h = r)
          : Array.isArray(r) && 2 === r.length
          ? ((h = (i = n(r, 2))[0]), (d = i[1]))
          : Array.isArray(r) && 3 === r.length
          ? ((h = (a = n(r, 3))[0]), (c = a[1]), (d = a[2]))
          : ((h = (s = n([r.method, r.arg, r.filter], 3))[0]),
            (c = s[1]),
            (d = s[2])),
        t.pushString(h),
        void 0 === c ? t.push(0) : (t.push(1), e.serializeAnyvar(t, c)),
        void 0 === d)
      )
        t.push(0);
      else {
        t.pushVaruint32(d.length);
        try {
          for (var l = o(d), p = l.next(); !p.done; p = l.next()) {
            var b = p.value;
            e.serializeQuery(t, b);
          }
        } catch (t) {
          f = { error: t };
        } finally {
          try {
            p && !p.done && (u = l.return) && u.call(l);
          } finally {
            if (f) throw f.error;
          }
        }
      }
    };
  },
  function (t, e, r) {
    "use strict";
    var i = r(1).rotr32;
    function n(t, e, r) {
      return (t & e) ^ (~t & r);
    }
    function a(t, e, r) {
      return (t & e) ^ (t & r) ^ (e & r);
    }
    function o(t, e, r) {
      return t ^ e ^ r;
    }
    (e.ft_1 = function (t, e, r, i) {
      return 0 === t
        ? n(e, r, i)
        : 1 === t || 3 === t
        ? o(e, r, i)
        : 2 === t
        ? a(e, r, i)
        : void 0;
    }),
      (e.ch32 = n),
      (e.maj32 = a),
      (e.p32 = o),
      (e.s0_256 = function (t) {
        return i(t, 2) ^ i(t, 13) ^ i(t, 22);
      }),
      (e.s1_256 = function (t) {
        return i(t, 6) ^ i(t, 11) ^ i(t, 25);
      }),
      (e.g0_256 = function (t) {
        return i(t, 7) ^ i(t, 18) ^ (t >>> 3);
      }),
      (e.g1_256 = function (t) {
        return i(t, 17) ^ i(t, 19) ^ (t >>> 10);
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(7),
      a = r(13),
      o = r(4),
      s = i.sum32,
      f = i.sum32_4,
      u = i.sum32_5,
      h = a.ch32,
      c = a.maj32,
      d = a.s0_256,
      l = a.s1_256,
      p = a.g0_256,
      b = a.g1_256,
      m = n.BlockHash,
      y = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
      ];
    function v() {
      if (!(this instanceof v)) return new v();
      m.call(this),
        (this.h = [
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225,
        ]),
        (this.k = y),
        (this.W = new Array(64));
    }
    i.inherits(v, m),
      (t.exports = v),
      (v.blockSize = 512),
      (v.outSize = 256),
      (v.hmacStrength = 192),
      (v.padLength = 64),
      (v.prototype._update = function (t, e) {
        for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i];
        for (; i < r.length; i++)
          r[i] = f(b(r[i - 2]), r[i - 7], p(r[i - 15]), r[i - 16]);
        var n = this.h[0],
          a = this.h[1],
          m = this.h[2],
          y = this.h[3],
          v = this.h[4],
          g = this.h[5],
          w = this.h[6],
          _ = this.h[7];
        for (o(this.k.length === r.length), i = 0; i < r.length; i++) {
          var M = u(_, l(v), h(v, g, w), this.k[i], r[i]),
            A = s(d(n), c(n, a, m));
          (_ = w),
            (w = g),
            (g = v),
            (v = s(y, M)),
            (y = m),
            (m = a),
            (a = n),
            (n = s(M, A));
        }
        (this.h[0] = s(this.h[0], n)),
          (this.h[1] = s(this.h[1], a)),
          (this.h[2] = s(this.h[2], m)),
          (this.h[3] = s(this.h[3], y)),
          (this.h[4] = s(this.h[4], v)),
          (this.h[5] = s(this.h[5], g)),
          (this.h[6] = s(this.h[6], w)),
          (this.h[7] = s(this.h[7], _));
      }),
      (v.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h, "big")
          : i.split32(this.h, "big");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(7),
      a = r(4),
      o = i.rotr64_hi,
      s = i.rotr64_lo,
      f = i.shr64_hi,
      u = i.shr64_lo,
      h = i.sum64,
      c = i.sum64_hi,
      d = i.sum64_lo,
      l = i.sum64_4_hi,
      p = i.sum64_4_lo,
      b = i.sum64_5_hi,
      m = i.sum64_5_lo,
      y = n.BlockHash,
      v = [
        1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
        3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
        2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
        310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
        1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
        3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
        264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
        1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
        2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
        3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
        113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
        773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
        1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
        2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
        3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
        3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
        430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
        883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
        1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
        2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
        2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
        3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
        3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
        174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
        685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
        1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
        1607167915, 987167468, 1816402316, 1246189591,
      ];
    function g() {
      if (!(this instanceof g)) return new g();
      y.call(this),
        (this.h = [
          1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
          4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
          2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
        ]),
        (this.k = v),
        (this.W = new Array(160));
    }
    function w(t, e, r, i, n) {
      var a = (t & r) ^ (~t & n);
      return a < 0 && (a += 4294967296), a;
    }
    function _(t, e, r, i, n, a) {
      var o = (e & i) ^ (~e & a);
      return o < 0 && (o += 4294967296), o;
    }
    function M(t, e, r, i, n) {
      var a = (t & r) ^ (t & n) ^ (r & n);
      return a < 0 && (a += 4294967296), a;
    }
    function A(t, e, r, i, n, a) {
      var o = (e & i) ^ (e & a) ^ (i & a);
      return o < 0 && (o += 4294967296), o;
    }
    function x(t, e) {
      var r = o(t, e, 28) ^ o(e, t, 2) ^ o(e, t, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function S(t, e) {
      var r = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function k(t, e) {
      var r = o(t, e, 14) ^ o(t, e, 18) ^ o(e, t, 9);
      return r < 0 && (r += 4294967296), r;
    }
    function z(t, e) {
      var r = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
      return r < 0 && (r += 4294967296), r;
    }
    function E(t, e) {
      var r = o(t, e, 1) ^ o(t, e, 8) ^ f(t, e, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function T(t, e) {
      var r = s(t, e, 1) ^ s(t, e, 8) ^ u(t, e, 7);
      return r < 0 && (r += 4294967296), r;
    }
    function R(t, e) {
      var r = o(t, e, 19) ^ o(e, t, 29) ^ f(t, e, 6);
      return r < 0 && (r += 4294967296), r;
    }
    function P(t, e) {
      var r = s(t, e, 19) ^ s(e, t, 29) ^ u(t, e, 6);
      return r < 0 && (r += 4294967296), r;
    }
    i.inherits(g, y),
      (t.exports = g),
      (g.blockSize = 1024),
      (g.outSize = 512),
      (g.hmacStrength = 192),
      (g.padLength = 128),
      (g.prototype._prepareBlock = function (t, e) {
        for (var r = this.W, i = 0; i < 32; i++) r[i] = t[e + i];
        for (; i < r.length; i += 2) {
          var n = R(r[i - 4], r[i - 3]),
            a = P(r[i - 4], r[i - 3]),
            o = r[i - 14],
            s = r[i - 13],
            f = E(r[i - 30], r[i - 29]),
            u = T(r[i - 30], r[i - 29]),
            h = r[i - 32],
            c = r[i - 31];
          (r[i] = l(n, a, o, s, f, u, h, c)),
            (r[i + 1] = p(n, a, o, s, f, u, h, c));
        }
      }),
      (g.prototype._update = function (t, e) {
        this._prepareBlock(t, e);
        var r = this.W,
          i = this.h[0],
          n = this.h[1],
          o = this.h[2],
          s = this.h[3],
          f = this.h[4],
          u = this.h[5],
          l = this.h[6],
          p = this.h[7],
          y = this.h[8],
          v = this.h[9],
          g = this.h[10],
          E = this.h[11],
          T = this.h[12],
          R = this.h[13],
          P = this.h[14],
          I = this.h[15];
        a(this.k.length === r.length);
        for (var N = 0; N < r.length; N += 2) {
          var U = P,
            B = I,
            O = k(y, v),
            D = z(y, v),
            L = w(y, v, g, E, T),
            K = _(y, v, g, E, T, R),
            C = this.k[N],
            j = this.k[N + 1],
            q = r[N],
            F = r[N + 1],
            Z = b(U, B, O, D, L, K, C, j, q, F),
            V = m(U, B, O, D, L, K, C, j, q, F);
          (U = x(i, n)),
            (B = S(i, n)),
            (O = M(i, n, o, s, f)),
            (D = A(i, n, o, s, f, u));
          var Y = c(U, B, O, D),
            H = d(U, B, O, D);
          (P = T),
            (I = R),
            (T = g),
            (R = E),
            (g = y),
            (E = v),
            (y = c(l, p, Z, V)),
            (v = d(p, p, Z, V)),
            (l = f),
            (p = u),
            (f = o),
            (u = s),
            (o = i),
            (s = n),
            (i = c(Z, V, Y, H)),
            (n = d(Z, V, Y, H));
        }
        h(this.h, 0, i, n),
          h(this.h, 2, o, s),
          h(this.h, 4, f, u),
          h(this.h, 6, l, p),
          h(this.h, 8, y, v),
          h(this.h, 10, g, E),
          h(this.h, 12, T, R),
          h(this.h, 14, P, I);
      }),
      (g.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h, "big")
          : i.split32(this.h, "big");
      });
  },
  function (t, e) {
    var r;
    r = (function () {
      return this;
    })();
    try {
      r = r || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (r = window);
    }
    t.exports = r;
  },
  function (t, e, r) {
    "use strict";
    var i,
      n =
        (this && this.__extends) ||
        ((i = function (t, e) {
          return (i =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var r in e)
                Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            })(t, e);
        }),
        function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Class extends value " +
                String(e) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          i(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((r.prototype = e.prototype), new r()));
        });
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.RpcError = void 0);
    var a = (function (t) {
      function e(r) {
        var i = this;
        return (
          r.error &&
          r.error.details &&
          r.error.details.length &&
          r.error.details[0].message
            ? ((i = t.call(this, r.error.details[0].message) || this).details =
                r.error.details)
            : r.processed && r.processed.except && r.processed.except.message
            ? ((i = t.call(this, r.processed.except.message) || this).details =
                r.processed.except)
            : r.result && r.result.except && r.result.except.message
            ? ((i = t.call(this, r.result.except.message) || this).details =
                r.result.except)
            : (i = t.call(this, r.message) || this),
          Object.setPrototypeOf(i, e.prototype),
          (i.json = r),
          i
        );
      }
      return n(e, t), e;
    })(Error);
    e.RpcError = a;
  },
  function (t, e, r) {
    "use strict";
    var i = e;
    (i.version = r(44).version),
      (i.utils = r(0)),
      (i.rand = r(21)),
      (i.curve = r(22)),
      (i.curves = r(11)),
      (i.ec = r(51)),
      (i.eddsa = r(55));
  },
  function (t, e) {
    t.exports = function (t) {
      return (
        t.webpackPolyfill ||
          ((t.deprecate = function () {}),
          (t.paths = []),
          t.children || (t.children = []),
          Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function () {
              return t.l;
            },
          }),
          Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function () {
              return t.i;
            },
          }),
          (t.webpackPolyfill = 1)),
        t
      );
    };
  },
  function (t, e, r) {
    "use strict";
    var i = e;
    function n(t) {
      return 1 === t.length ? "0" + t : t;
    }
    function a(t) {
      for (var e = "", r = 0; r < t.length; r++) e += n(t[r].toString(16));
      return e;
    }
    (i.toArray = function (t, e) {
      if (Array.isArray(t)) return t.slice();
      if (!t) return [];
      var r = [];
      if ("string" != typeof t) {
        for (var i = 0; i < t.length; i++) r[i] = 0 | t[i];
        return r;
      }
      if ("hex" === e) {
        (t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t);
        for (i = 0; i < t.length; i += 2) r.push(parseInt(t[i] + t[i + 1], 16));
      } else
        for (i = 0; i < t.length; i++) {
          var n = t.charCodeAt(i),
            a = n >> 8,
            o = 255 & n;
          a ? r.push(a, o) : r.push(o);
        }
      return r;
    }),
      (i.zero2 = n),
      (i.toHex = a),
      (i.encode = function (t, e) {
        return "hex" === e ? a(t) : t;
      });
  },
  function (t, e, r) {
    var i;
    function n(t) {
      this.rand = t;
    }
    if (
      ((t.exports = function (t) {
        return i || (i = new n(null)), i.generate(t);
      }),
      (t.exports.Rand = n),
      (n.prototype.generate = function (t) {
        return this._rand(t);
      }),
      (n.prototype._rand = function (t) {
        if (this.rand.getBytes) return this.rand.getBytes(t);
        for (var e = new Uint8Array(t), r = 0; r < e.length; r++)
          e[r] = this.rand.getByte();
        return e;
      }),
      "object" == typeof self)
    )
      self.crypto && self.crypto.getRandomValues
        ? (n.prototype._rand = function (t) {
            var e = new Uint8Array(t);
            return self.crypto.getRandomValues(e), e;
          })
        : self.msCrypto && self.msCrypto.getRandomValues
        ? (n.prototype._rand = function (t) {
            var e = new Uint8Array(t);
            return self.msCrypto.getRandomValues(e), e;
          })
        : "object" == typeof window &&
          (n.prototype._rand = function () {
            throw new Error("Not implemented yet");
          });
    else
      try {
        var a = r(46);
        if ("function" != typeof a.randomBytes)
          throw new Error("Not supported");
        n.prototype._rand = function (t) {
          return a.randomBytes(t);
        };
      } catch (t) {}
  },
  function (t, e, r) {
    "use strict";
    var i = e;
    (i.base = r(10)), (i.short = r(47)), (i.mont = r(48)), (i.edwards = r(49));
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.PublicKey = void 0);
      var i = r(2),
        n = r(5),
        a = (function () {
          function e(t, e) {
            (this.key = t), (this.ec = e);
          }
          return (
            (e.fromString = function (t, r) {
              var a = i.stringToPublicKey(t);
              return r || (r = n.constructElliptic(a.type)), new e(a, r);
            }),
            (e.fromElliptic = function (t, r, i) {
              var a = t.getPublic().getX().toArray("be", 32),
                o = t.getPublic().getY().toArray("be", 32);
              return (
                i || (i = n.constructElliptic(r)),
                new e(
                  {
                    type: r,
                    data: new Uint8Array([1 & o[31] ? 3 : 2].concat(a)),
                  },
                  i
                )
              );
            }),
            (e.prototype.toString = function () {
              return i.publicKeyToString(this.key);
            }),
            (e.prototype.toLegacyString = function () {
              return i.publicKeyToLegacyString(this.key);
            }),
            (e.prototype.toElliptic = function () {
              return this.ec.keyPair({ pub: t.from(this.key.data) });
            }),
            (e.prototype.getType = function () {
              return this.key.type;
            }),
            (e.prototype.isValid = function () {
              try {
                return this.toElliptic().validate().result;
              } catch (t) {
                return !1;
              }
            }),
            e
          );
        })();
      e.PublicKey = a;
    }).call(this, r(9).Buffer);
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.PrivateKey = void 0);
      var i = r(2),
        n = r(5),
        a = (function () {
          function e(t, e) {
            (this.key = t), (this.ec = e);
          }
          return (
            (e.fromElliptic = function (r, i, a) {
              return (
                a || (a = n.constructElliptic(i)),
                new e(
                  { type: i, data: r.getPrivate().toArrayLike(t, "be", 32) },
                  a
                )
              );
            }),
            (e.fromString = function (t, r) {
              var a = i.stringToPrivateKey(t);
              return r || (r = n.constructElliptic(a.type)), new e(a, r);
            }),
            (e.prototype.toElliptic = function () {
              return this.ec.keyFromPrivate(this.key.data);
            }),
            (e.prototype.toLegacyString = function () {
              return i.privateKeyToLegacyString(this.key);
            }),
            (e.prototype.toString = function () {
              return i.privateKeyToString(this.key);
            }),
            (e.prototype.getType = function () {
              return this.key.type;
            }),
            (e.prototype.getPublicKey = function () {
              var t = this.toElliptic();
              return n.PublicKey.fromElliptic(t, this.getType(), this.ec);
            }),
            (e.prototype.sign = function (e, r, a) {
              var o = this;
              void 0 === r && (r = !0),
                void 0 === a && (a = "utf8"),
                r &&
                  ("string" == typeof e && (e = t.from(e, a)),
                  (e = this.ec.hash().update(e).digest()));
              var s,
                f,
                u = 0,
                h = function (t) {
                  var r = o.toElliptic().sign(e, t);
                  return n.Signature.fromElliptic(r, o.getType(), o.ec);
                };
              if (this.key.type === i.KeyType.k1)
                do {
                  s = h({ canonical: !0, pers: [++u] });
                } while (
                  128 & (f = s.toBinary())[1] ||
                  (0 === f[1] && !(128 & f[2])) ||
                  128 & f[33] ||
                  !(0 !== f[33] || 128 & f[34])
                );
              else s = h({ canonical: !0 });
              return s;
            }),
            (e.prototype.isValid = function () {
              try {
                return this.toElliptic().validate().result;
              } catch (t) {
                return !1;
              }
            }),
            e
          );
        })();
      e.PrivateKey = a;
    }).call(this, r(9).Buffer);
  },
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__assign) ||
        function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, r = 1, i = arguments.length; r < i; r++)
                for (var n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }).apply(this, arguments);
        },
      n =
        (this && this.__awaiter) ||
        function (t, e, r, i) {
          return new (r || (r = Promise))(function (n, a) {
            function o(t) {
              try {
                f(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                f(i.throw(t));
              } catch (t) {
                a(t);
              }
            }
            function f(t) {
              var e;
              t.done
                ? n(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(o, s);
            }
            f((i = i.apply(t, e || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (t, e) {
          var r,
            i,
            n,
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(s) {
            return function (f) {
              return (function (s) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; a && ((a = 0), s[0] && (o = 0)), o; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (n =
                          2 & s[0]
                            ? i.return
                            : s[0]
                            ? i.throw || ((n = i.return) && n.call(i), 0)
                            : i.next) &&
                        !(n = n.call(i, s[1])).done)
                    )
                      return n;
                    switch (((i = 0), n && (s = [2 & s[0], n.value]), s[0])) {
                      case 0:
                      case 1:
                        n = s;
                        break;
                      case 4:
                        return o.label++, { value: s[1], done: !1 };
                      case 5:
                        o.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !((n = o.trys),
                          (n = n.length > 0 && n[n.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0]))
                        ) {
                          o = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!n || (s[1] > n[0] && s[1] < n[3]))
                        ) {
                          o.label = s[1];
                          break;
                        }
                        if (6 === s[0] && o.label < n[1]) {
                          (o.label = n[1]), (n = s);
                          break;
                        }
                        if (n && o.label < n[2]) {
                          (o.label = n[2]), o.ops.push(s);
                          break;
                        }
                        n[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    s = e.call(t, o);
                  } catch (t) {
                    (s = [6, t]), (i = 0);
                  } finally {
                    r = n = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, f]);
            };
          }
        },
      o =
        (this && this.__values) ||
        function (t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            i = 0;
          if (r) return r.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && i >= t.length && (t = void 0),
                  { value: t && t[i++], done: !t }
                );
              },
            };
          throw new TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        },
      s =
        (this && this.__read) ||
        function (t, e) {
          var r = "function" == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var i,
            n,
            a = r.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; )
              o.push(i.value);
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              i && !i.done && (r = a.return) && r.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          return o;
        },
      f =
        (this && this.__spreadArray) ||
        function (t, e, r) {
          if (r || 2 === arguments.length)
            for (var i, n = 0, a = e.length; n < a; n++)
              (!i && n in e) ||
                (i || (i = Array.prototype.slice.call(e, 0, n)), (i[n] = e[n]));
          return t.concat(i || Array.prototype.slice.call(e));
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.defaultTxVerifier = e.WaxJS = void 0);
    var u = r(26),
      h = r(39),
      c = r(61),
      d = (function () {
        function t(t) {
          var e = t.rpcEndpoint,
            r = t.tryAutoLogin,
            i = void 0 === r || r,
            o = t.userAccount,
            s = t.pubKeys,
            f = t.apiSigner,
            h = t.waxSigningURL,
            d = void 0 === h ? "https://www.mycloudwallet.com" : h,
            p = t.waxAutoSigningURL,
            b =
              void 0 === p
                ? "https://idm-api.mycloudwallet.com/v1/accounts/auto-accept/"
                : p,
            m = t.eosApiArgs,
            y = void 0 === m ? {} : m,
            v = t.freeBandwidth,
            g = void 0 === v || v,
            w = t.feeFallback,
            _ = void 0 === w || w,
            M = t.verifyTx,
            A = void 0 === M ? l : M,
            x = t.metricURL,
            S = void 0 === x ? "" : x,
            k = t.returnTempAccounts,
            z = void 0 !== k && k,
            E = this;
          (this.signingApi = new c.WaxSigningApi(d, b, S, z)),
            (this.rpc = new u.JsonRpc(e)),
            (this.rpcUrl = e),
            (this.waxSigningURL = d),
            (this.waxAutoSigningURL = b),
            (this.apiSigner = f),
            (this.eosApiArgs = y),
            (this.freeBandwidth = g),
            (this.feeFallback = _),
            (this.metricURL = S),
            (this.proofWaxKey = ""),
            (this.verifyTx = A),
            (this.returnTempAccounts = z),
            o && Array.isArray(s)
              ? this.receiveLogin({ account: o, keys: s })
              : i &&
                this.signingApi.tryAutologin().then(function (t) {
                  return n(E, void 0, void 0, function () {
                    var e;
                    return a(this, function (r) {
                      switch (r.label) {
                        case 0:
                          return t
                            ? ((e = this.receiveLogin),
                              [4, this.signingApi.login()])
                            : [3, 2];
                        case 1:
                          e.apply(this, [r.sent()]), (r.label = 2);
                        case 2:
                          return [2];
                      }
                    });
                  });
                });
        }
        return (
          Object.defineProperty(t.prototype, "userAccount", {
            get: function () {
              return this.user && this.user.account;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "pubKeys", {
            get: function () {
              return this.user && this.user.keys;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "isTemp", {
            get: function () {
              return this.user && this.user.isTemp;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "createInfo", {
            get: function () {
              return this.user && this.user.createData;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype.login = function () {
            return n(this, void 0, void 0, function () {
              var t;
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.user
                      ? [3, 2]
                      : ((t = this.receiveLogin), [4, this.signingApi.login()]);
                  case 1:
                    t.apply(this, [e.sent()]), (e.label = 2);
                  case 2:
                    return [2, this.user.account];
                }
              });
            });
          }),
          (t.prototype.isAutoLoginAvailable = function () {
            return n(this, void 0, void 0, function () {
              var t;
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return this.user ? [2, !0] : [3, 1];
                  case 1:
                    return [4, this.signingApi.tryAutologin()];
                  case 2:
                    return e.sent()
                      ? ((t = this.receiveLogin), [4, this.signingApi.login()])
                      : [3, 4];
                  case 3:
                    return t.apply(this, [e.sent()]), [2, !0];
                  case 4:
                    return [2, !1];
                }
              });
            });
          }),
          (t.prototype.logout = function () {
            return n(this, void 0, void 0, function () {
              return a(this, function (t) {
                return (
                  (this.user = null),
                  (this.api = null),
                  this.signingApi && this.signingApi.logout(),
                  [2]
                );
              });
            });
          }),
          (t.prototype.userAccountProof = function (t, e, r) {
            return (
              void 0 === r && (r = !0),
              n(this, void 0, void 0, function () {
                var n, s, f, u, c, d, l, p;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      if (!this.user) throw new Error("User is not logged in");
                      return [4, this.signingApi.proofWindow(t, 2, e)];
                    case 1:
                      if (((n = a.sent()), (s = t), !r))
                        return [2, i(i({}, n), { message: s })];
                      a.label = 2;
                    case 2:
                      a.trys.push([2, 7, 8, 9]),
                        (f = o(this.pubKeys)),
                        (u = f.next()),
                        (a.label = 3);
                    case 3:
                      return u.done
                        ? [3, 6]
                        : ((c = u.value), [4, h.ecc.verify(n.signature, s, c)]);
                    case 4:
                      if (a.sent()) return [2, !0];
                      a.label = 5;
                    case 5:
                      return (u = f.next()), [3, 3];
                    case 6:
                      return [3, 9];
                    case 7:
                      return (d = a.sent()), (l = { error: d }), [3, 9];
                    case 8:
                      try {
                        u && !u.done && (p = f.return) && p.call(f);
                      } finally {
                        if (l) throw l.error;
                      }
                      return [7];
                    case 9:
                      return [2, !1];
                  }
                });
              })
            );
          }),
          (t.prototype.waxProof = function (t, e) {
            return (
              void 0 === e && (e = !0),
              n(this, void 0, void 0, function () {
                var r, n;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      if (!this.user) throw new Error("User is not logged in");
                      return "" !== this.proofWaxKey
                        ? [3, 2]
                        : [4, this.getRequiredKeys()];
                    case 1:
                      a.sent(), (a.label = 2);
                    case 2:
                      return [4, this.signingApi.proofWindow(t, 1, null)];
                    case 3:
                      return (
                        (r = a.sent()),
                        (n = "cloudwallet-verification-"
                          .concat(r.referer, "-")
                          .concat(t, "-")
                          .concat(r.accountName)),
                        e
                          ? [4, h.ecc.verify(r.signature, n, this.proofWaxKey)]
                          : [2, i(i({}, r), { message: n })]
                      );
                    case 4:
                      return [2, a.sent()];
                  }
                });
              })
            );
          }),
          (t.prototype.getRequiredKeys = function () {
            return n(this, void 0, void 0, function () {
              var t, e, r, i, n, s;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return [
                      4,
                      fetch("".concat(this.rpcUrl, "/v1/chain/get_account"), {
                        body: JSON.stringify({ account_name: "proof.wax" }),
                        method: "POST",
                      }).then(function (t) {
                        return t.json();
                      }),
                    ];
                  case 1:
                    if ((t = a.sent()).permissions)
                      try {
                        for (
                          e = o(t.permissions), r = e.next();
                          !r.done;
                          r = e.next()
                        )
                          "active" === (i = r.value).perm_name &&
                            (this.proofWaxKey = i.required_auth.keys[0].key);
                      } catch (t) {
                        n = { error: t };
                      } finally {
                        try {
                          r && !r.done && (s = e.return) && s.call(e);
                        } finally {
                          if (n) throw n.error;
                        }
                      }
                    return [2];
                }
              });
            });
          }),
          (t.prototype.receiveLogin = function (t) {
            var e = this;
            this.user = t;
            var r = {
              getAvailableKeys: function () {
                return n(e, void 0, void 0, function () {
                  var t, e;
                  return a(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return (
                          (t = [f([], s(this.user.keys), !1)]),
                          (e = this.apiSigner)
                            ? [4, this.apiSigner.getAvailableKeys()]
                            : [3, 2]
                        );
                      case 1:
                        (e = r.sent()), (r.label = 2);
                      case 2:
                        return [
                          2,
                          f.apply(
                            void 0,
                            t.concat([s.apply(void 0, [e || []]), !1])
                          ),
                        ];
                    }
                  });
                });
              },
              sign: function (t) {
                return n(e, void 0, void 0, function () {
                  var e, r, i, n, o, u, h, c;
                  return a(this, function (a) {
                    switch (a.label) {
                      case 0:
                        return [
                          4,
                          this.api.deserializeTransactionWithActions(
                            t.serializedTransaction
                          ),
                        ];
                      case 1:
                        return (
                          (e = a.sent()),
                          [
                            4,
                            this.signingApi.signing(
                              e,
                              t.serializedTransaction,
                              !this.freeBandwidth,
                              this.feeFallback
                            ),
                          ]
                        );
                      case 2:
                        return (
                          (r = a.sent()),
                          (i = r.serializedTransaction),
                          (n = r.signatures),
                          [4, this.api.deserializeTransactionWithActions(i)]
                        );
                      case 3:
                        return (
                          (o = a.sent()),
                          this.verifyTx(this.user, e, o),
                          (t.serializedTransaction = i),
                          (c = { serializedTransaction: i }),
                          (u = [f([], s(n), !1)]),
                          (h = this.apiSigner)
                            ? [4, this.apiSigner.sign(t)]
                            : [3, 5]
                        );
                      case 4:
                        (h = a.sent().signatures), (a.label = 5);
                      case 5:
                        return [
                          2,
                          ((c.signatures = f.apply(
                            void 0,
                            u.concat([s.apply(void 0, [h || []]), !1])
                          )),
                          c),
                        ];
                    }
                  });
                });
              },
            };
            this.api = new u.Api(
              i(i({}, this.eosApiArgs), { rpc: this.rpc, signatureProvider: r })
            );
            var o = this.api.transact.bind(this.api);
            this.api.transact = function (t, r) {
              return n(e, void 0, void 0, function () {
                return a(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [4, this.signingApi.prepareTransaction(t)];
                    case 1:
                      return e.sent(), [4, o(t, r)];
                    case 2:
                      return [2, e.sent()];
                  }
                });
              });
            };
          }),
          t
        );
      })();
    function l(t, e, r) {
      var i,
        n,
        a = e.actions,
        s = r.actions;
      if (JSON.stringify(a) !== JSON.stringify(s.slice(s.length - a.length)))
        throw new Error(
          "Augmented transaction actions has modified actions from the original.\nOriginal: "
            .concat(JSON.stringify(a, void 0, 2), "\nAugmented: ")
            .concat(JSON.stringify(s, void 0, 2))
        );
      try {
        for (
          var f = o(s.slice(0, s.length - a.length)), u = f.next();
          !u.done;
          u = f.next()
        ) {
          var h = u.value;
          if (
            h.authorization.find(function (e) {
              return e.actor === t.account;
            })
          ) {
            if ("eosio.token" === h.account && "transfer" === h.name) {
              var c = s[0];
              if (
                "txfee.wax" === h.data.to &&
                h.data.memo.startsWith("WAX fee for ") &&
                JSON.stringify(c) ===
                  JSON.stringify({
                    account: "boost.wax",
                    name: "noop",
                    authorization: [
                      { actor: "boost.wax", permission: "paybw" },
                    ],
                    data: {},
                  })
              )
                continue;
            }
            if (
              "eosio" === h.account &&
              "buyrambytes" === h.name &&
              h.data.receiver === t.account
            )
              continue;
            throw new Error(
              "Augmented transaction actions has an extra action from the original authorizing the user.\nOriginal: "
                .concat(JSON.stringify(a, void 0, 2), "\nAugmented: ")
                .concat(JSON.stringify(s, void 0, 2))
            );
          }
        }
      } catch (t) {
        i = { error: t };
      } finally {
        try {
          u && !u.done && (n = f.return) && n.call(f);
        } finally {
          if (i) throw i.error;
        }
      }
    }
    (e.WaxJS = d), (e.defaultTxVerifier = l);
  },
  function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.Serialize =
        e.RpcError =
        e.RpcInterfaces =
        e.Numeric =
        e.JsonRpc =
        e.ApiInterfaces =
        e.Api =
          void 0);
    var i = r(27);
    Object.defineProperty(e, "Api", {
      enumerable: !0,
      get: function () {
        return i.Api;
      },
    });
    var n = r(36);
    e.ApiInterfaces = n;
    var a = r(37);
    Object.defineProperty(e, "JsonRpc", {
      enumerable: !0,
      get: function () {
        return a.JsonRpc;
      },
    });
    var o = r(2);
    e.Numeric = o;
    var s = r(38);
    e.RpcInterfaces = s;
    var f = r(17);
    Object.defineProperty(e, "RpcError", {
      enumerable: !0,
      get: function () {
        return f.RpcError;
      },
    });
    var u = r(12);
    e.Serialize = u;
  },
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__assign) ||
        function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, r = 1, i = arguments.length; r < i; r++)
                for (var n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }).apply(this, arguments);
        },
      n =
        (this && this.__awaiter) ||
        function (t, e, r, i) {
          return new (r || (r = Promise))(function (n, a) {
            function o(t) {
              try {
                f(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                f(i.throw(t));
              } catch (t) {
                a(t);
              }
            }
            function f(t) {
              var e;
              t.done
                ? n(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(o, s);
            }
            f((i = i.apply(t, e || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (t, e) {
          var r,
            i,
            n,
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(a) {
            return function (s) {
              return (function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; o; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (n =
                          2 & a[0]
                            ? i.return
                            : a[0]
                            ? i.throw || ((n = i.return) && n.call(i), 0)
                            : i.next) &&
                        !(n = n.call(i, a[1])).done)
                    )
                      return n;
                    switch (((i = 0), n && (a = [2 & a[0], n.value]), a[0])) {
                      case 0:
                      case 1:
                        n = a;
                        break;
                      case 4:
                        return o.label++, { value: a[1], done: !1 };
                      case 5:
                        o.label++, (i = a[1]), (a = [0]);
                        continue;
                      case 7:
                        (a = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !((n = o.trys),
                          (n = n.length > 0 && n[n.length - 1]) ||
                            (6 !== a[0] && 2 !== a[0]))
                        ) {
                          o = 0;
                          continue;
                        }
                        if (
                          3 === a[0] &&
                          (!n || (a[1] > n[0] && a[1] < n[3]))
                        ) {
                          o.label = a[1];
                          break;
                        }
                        if (6 === a[0] && o.label < n[1]) {
                          (o.label = n[1]), (n = a);
                          break;
                        }
                        if (n && o.label < n[2]) {
                          (o.label = n[2]), o.ops.push(a);
                          break;
                        }
                        n[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    a = e.call(t, o);
                  } catch (t) {
                    (a = [6, t]), (i = 0);
                  } finally {
                    r = n = 0;
                  }
                if (5 & a[0]) throw a[1];
                return { value: a[0] ? a[1] : void 0, done: !0 };
              })([a, s]);
            };
          }
        },
      o =
        (this && this.__read) ||
        function (t, e) {
          var r = "function" == typeof Symbol && t[Symbol.iterator];
          if (!r) return t;
          var i,
            n,
            a = r.call(t),
            o = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(i = a.next()).done; )
              o.push(i.value);
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              i && !i.done && (r = a.return) && r.call(a);
            } finally {
              if (n) throw n.error;
            }
          }
          return o;
        },
      s =
        (this && this.__spreadArray) ||
        function (t, e) {
          for (var r = 0, i = e.length, n = t.length; r < i; r++, n++)
            t[n] = e[r];
          return t;
        },
      f =
        (this && this.__values) ||
        function (t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            r = e && t[e],
            i = 0;
          if (r) return r.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && i >= t.length && (t = void 0),
                  { value: t && t[i++], done: !t }
                );
              },
            };
          throw new TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ActionBuilder = e.TransactionBuilder = e.Api = void 0);
    var u = r(28),
      h = r(12),
      c = (function () {
        function t(t) {
          (this.contracts = new Map()),
            (this.cachedAbis = new Map()),
            (this.transactionExtensions = [
              {
                id: 1,
                type: "resource_payer",
                keys: [
                  "payer",
                  "max_net_bytes",
                  "max_cpu_us",
                  "max_memory_bytes",
                ],
              },
            ]),
            (this.rpc = t.rpc),
            (this.authorityProvider = t.authorityProvider || t.rpc),
            (this.abiProvider = t.abiProvider || t.rpc),
            (this.signatureProvider = t.signatureProvider),
            (this.chainId = t.chainId),
            (this.textEncoder = t.textEncoder),
            (this.textDecoder = t.textDecoder),
            (this.abiTypes = h.getTypesFromAbi(h.createAbiTypes())),
            (this.transactionTypes = h.getTypesFromAbi(
              h.createTransactionTypes()
            ));
        }
        return (
          (t.prototype.rawAbiToJson = function (t) {
            var e = new h.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
              array: t,
            });
            if (!h.supportedAbiVersion(e.getString()))
              throw new Error("Unsupported abi version");
            return e.restartRead(), this.abiTypes.get("abi_def").deserialize(e);
          }),
          (t.prototype.jsonToRawAbi = function (t) {
            var e = new h.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            if (
              (this.abiTypes.get("abi_def").serialize(e, t),
              !h.supportedAbiVersion(e.getString()))
            )
              throw new Error("Unsupported abi version");
            return e.asUint8Array();
          }),
          (t.prototype.getCachedAbi = function (t, e) {
            return (
              void 0 === e && (e = !1),
              n(this, void 0, void 0, function () {
                var r, i, n, o;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      if (!e && this.cachedAbis.get(t))
                        return [2, this.cachedAbis.get(t)];
                      a.label = 1;
                    case 1:
                      return (
                        a.trys.push([1, 3, , 4]),
                        [4, this.abiProvider.getRawAbi(t)]
                      );
                    case 2:
                      return (
                        (i = a.sent().abi),
                        (n = this.rawAbiToJson(i)),
                        (r = { rawAbi: i, abi: n }),
                        [3, 4]
                      );
                    case 3:
                      throw (
                        (((o = a.sent()).message =
                          "fetching abi for " + t + ": " + o.message),
                        o)
                      );
                    case 4:
                      if (!r) throw new Error("Missing abi for " + t);
                      return this.cachedAbis.set(t, r), [2, r];
                  }
                });
              })
            );
          }),
          (t.prototype.getAbi = function (t, e) {
            return (
              void 0 === e && (e = !1),
              n(this, void 0, void 0, function () {
                return a(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [4, this.getCachedAbi(t, e)];
                    case 1:
                      return [2, r.sent().abi];
                  }
                });
              })
            );
          }),
          (t.prototype.getTransactionAbis = function (t, e) {
            return (
              void 0 === e && (e = !1),
              n(this, void 0, void 0, function () {
                var r,
                  i,
                  f,
                  u,
                  h = this;
                return a(this, function (c) {
                  return (
                    (r = (t.context_free_actions || []).concat(t.actions)),
                    (i = r.map(function (t) {
                      return t.account;
                    })),
                    (f = new Set(i)),
                    (u = s([], o(f)).map(function (t) {
                      return n(h, void 0, void 0, function () {
                        var r;
                        return a(this, function (i) {
                          switch (i.label) {
                            case 0:
                              return (
                                (r = { accountName: t }),
                                [4, this.getCachedAbi(t, e)]
                              );
                            case 1:
                              return [2, ((r.abi = i.sent().rawAbi), r)];
                          }
                        });
                      });
                    })),
                    [2, Promise.all(u)]
                  );
                });
              })
            );
          }),
          (t.prototype.getContract = function (t, e) {
            return (
              void 0 === e && (e = !1),
              n(this, void 0, void 0, function () {
                var r, i, n, o, s, u, c, d, l, p, b;
                return a(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return !e && this.contracts.get(t)
                        ? [2, this.contracts.get(t)]
                        : [4, this.getAbi(t, e)];
                    case 1:
                      (r = a.sent()),
                        (i = h.getTypesFromAbi(h.createInitialTypes(), r)),
                        (n = new Map());
                      try {
                        for (
                          o = f(r.actions), s = o.next();
                          !s.done;
                          s = o.next()
                        )
                          (u = s.value),
                            (c = u.name),
                            (d = u.type),
                            n.set(c, h.getType(i, d));
                      } catch (t) {
                        p = { error: t };
                      } finally {
                        try {
                          s && !s.done && (b = o.return) && b.call(o);
                        } finally {
                          if (p) throw p.error;
                        }
                      }
                      return (
                        (l = { types: i, actions: n }),
                        this.contracts.set(t, l),
                        [2, l]
                      );
                  }
                });
              })
            );
          }),
          (t.prototype.serialize = function (t, e, r) {
            this.transactionTypes.get(e).serialize(t, r);
          }),
          (t.prototype.deserialize = function (t, e) {
            return this.transactionTypes.get(e).deserialize(t);
          }),
          (t.prototype.serializeTransaction = function (t) {
            var e = new h.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            return (
              this.serialize(
                e,
                "transaction",
                i(
                  {
                    max_net_usage_words: 0,
                    max_cpu_usage_ms: 0,
                    delay_sec: 0,
                    context_free_actions: [],
                    actions: [],
                    transaction_extensions: [],
                  },
                  t
                )
              ),
              e.asUint8Array()
            );
          }),
          (t.prototype.serializeContextFreeData = function (t) {
            var e, r;
            if (!t || !t.length) return null;
            var i = new h.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            i.pushVaruint32(t.length);
            try {
              for (var n = f(t), a = n.next(); !a.done; a = n.next()) {
                var o = a.value;
                i.pushBytes(o);
              }
            } catch (t) {
              e = { error: t };
            } finally {
              try {
                a && !a.done && (r = n.return) && r.call(n);
              } finally {
                if (e) throw e.error;
              }
            }
            return i.asUint8Array();
          }),
          (t.prototype.deserializeTransaction = function (t) {
            var e = new h.SerialBuffer({
              textEncoder: this.textEncoder,
              textDecoder: this.textDecoder,
            });
            return e.pushArray(t), this.deserialize(e, "transaction");
          }),
          (t.prototype.serializeTransactionExtensions = function (t) {
            var e = [];
            if (t.resource_payer) {
              var r = new h.SerialBuffer({
                textEncoder: this.textEncoder,
                textDecoder: this.textDecoder,
              });
              h
                .getTypesFromAbi(h.createTransactionExtensionTypes())
                .get("resource_payer")
                .serialize(r, t.resource_payer),
                (e = s(s([], o(e)), [[1, h.arrayToHex(r.asUint8Array())]]));
            }
            return e;
          }),
          (t.prototype.deserializeTransactionExtensions = function (t) {
            var e = this,
              r = {};
            return (
              t.forEach(function (t) {
                var i = e.transactionExtensions.find(function (e) {
                  return e.id === t[0];
                });
                if (void 0 === i)
                  throw new Error(
                    "Transaction Extension could not be determined: " + t
                  );
                var n = h.getTypesFromAbi(h.createTransactionExtensionTypes()),
                  a = new h.SerialBuffer({
                    textEncoder: e.textEncoder,
                    textDecoder: e.textDecoder,
                  });
                a.pushArray(h.hexToUint8Array(t[1]));
                var o = n.get(i.type).deserialize(a);
                1 === t[0] &&
                  ((o.max_net_bytes = Number(o.max_net_bytes)),
                  (o.max_cpu_us = Number(o.max_cpu_us)),
                  (o.max_memory_bytes = Number(o.max_memory_bytes)),
                  (r.resource_payer = o));
              }),
              r
            );
          }),
          (t.prototype.deleteTransactionExtensionObjects = function (t) {
            return delete t.resource_payer, t;
          }),
          (t.prototype.serializeActions = function (t) {
            return n(this, void 0, void 0, function () {
              var e = this;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      Promise.all(
                        t.map(function (t) {
                          return n(e, void 0, void 0, function () {
                            var e, r, i, n, o;
                            return a(this, function (a) {
                              switch (a.label) {
                                case 0:
                                  return (
                                    (e = t.account),
                                    (r = t.name),
                                    (i = t.authorization),
                                    (n = t.data),
                                    [4, this.getContract(e)]
                                  );
                                case 1:
                                  return (
                                    (o = a.sent()),
                                    "object" != typeof n
                                      ? [2, t]
                                      : [
                                          2,
                                          h.serializeAction(
                                            o,
                                            e,
                                            r,
                                            i,
                                            n,
                                            this.textEncoder,
                                            this.textDecoder
                                          ),
                                        ]
                                  );
                              }
                            });
                          });
                        })
                      ),
                    ];
                  case 1:
                    return [2, r.sent()];
                }
              });
            });
          }),
          (t.prototype.deserializeActions = function (t) {
            return n(this, void 0, void 0, function () {
              var e = this;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return [
                      4,
                      Promise.all(
                        t.map(function (t) {
                          var r = t.account,
                            i = t.name,
                            o = t.authorization,
                            s = t.data;
                          return n(e, void 0, void 0, function () {
                            var t;
                            return a(this, function (e) {
                              switch (e.label) {
                                case 0:
                                  return [4, this.getContract(r)];
                                case 1:
                                  return (
                                    (t = e.sent()),
                                    [
                                      2,
                                      h.deserializeAction(
                                        t,
                                        r,
                                        i,
                                        o,
                                        s,
                                        this.textEncoder,
                                        this.textDecoder
                                      ),
                                    ]
                                  );
                              }
                            });
                          });
                        })
                      ),
                    ];
                  case 1:
                    return [2, r.sent()];
                }
              });
            });
          }),
          (t.prototype.deserializeTransactionWithActions = function (t) {
            return n(this, void 0, void 0, function () {
              var e, r, n;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (
                      "string" == typeof t && (t = h.hexToUint8Array(t)),
                      (e = this.deserializeTransaction(t)),
                      [4, this.deserializeActions(e.context_free_actions)]
                    );
                  case 1:
                    return (
                      (r = a.sent()), [4, this.deserializeActions(e.actions)]
                    );
                  case 2:
                    return (
                      (n = a.sent()),
                      [2, i(i({}, e), { context_free_actions: r, actions: n })]
                    );
                }
              });
            });
          }),
          (t.prototype.deflateSerializedArray = function (t) {
            return u.deflate(t, { level: 9 });
          }),
          (t.prototype.inflateSerializedArray = function (t) {
            return u.inflate(t);
          }),
          (t.prototype.transact = function (t, e) {
            var r = void 0 === e ? {} : e,
              o = r.broadcast,
              s = void 0 === o || o,
              f = r.sign,
              u = void 0 === f || f,
              h = r.readOnlyTrx,
              c = r.returnFailureTraces,
              d = r.requiredKeys,
              l = r.compression,
              p = r.blocksBehind,
              b = r.useLastIrreversible,
              m = r.expireSeconds;
            return n(this, void 0, void 0, function () {
              var e, r, n, o, f, y, v, g;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    if ("number" == typeof p && b)
                      throw new Error(
                        "Use either blocksBehind or useLastIrreversible"
                      );
                    return this.chainId ? [3, 2] : [4, this.rpc.get_info()];
                  case 1:
                    (e = a.sent()), (this.chainId = e.chain_id), (a.label = 2);
                  case 2:
                    return ("number" != typeof p && !b) || !m
                      ? [3, 4]
                      : [4, this.generateTapos(e, t, p, b, m)];
                  case 3:
                    (t = a.sent()), (a.label = 4);
                  case 4:
                    if (!this.hasRequiredTaposFields(t))
                      throw new Error(
                        "Required configuration or TAPOS fields are not present"
                      );
                    return [4, this.getTransactionAbis(t)];
                  case 5:
                    return (
                      (r = a.sent()),
                      (n = [i({}, t)]),
                      (g = {}),
                      [4, this.serializeTransactionExtensions(t)]
                    );
                  case 6:
                    return (
                      (g.transaction_extensions = a.sent()),
                      [4, this.serializeActions(t.context_free_actions || [])]
                    );
                  case 7:
                    return (
                      (g.context_free_actions = a.sent()),
                      [4, this.serializeActions(t.actions)]
                    );
                  case 8:
                    return (
                      (t = i.apply(
                        void 0,
                        n.concat([((g.actions = a.sent()), g)])
                      )),
                      (t = this.deleteTransactionExtensionObjects(t)),
                      (o = this.serializeTransaction(t)),
                      (f = this.serializeContextFreeData(t.context_free_data)),
                      (y = {
                        serializedTransaction: o,
                        serializedContextFreeData: f,
                        signatures: [],
                      }),
                      u
                        ? d
                          ? [3, 11]
                          : [4, this.signatureProvider.getAvailableKeys()]
                        : [3, 13]
                    );
                  case 9:
                    return (
                      (v = a.sent()),
                      [
                        4,
                        this.authorityProvider.getRequiredKeys({
                          transaction: t,
                          availableKeys: v,
                        }),
                      ]
                    );
                  case 10:
                    (d = a.sent()), (a.label = 11);
                  case 11:
                    return [
                      4,
                      this.signatureProvider.sign({
                        chainId: this.chainId,
                        requiredKeys: d,
                        serializedTransaction: o,
                        serializedContextFreeData: f,
                        abis: r,
                      }),
                    ];
                  case 12:
                    (y = a.sent()), (a.label = 13);
                  case 13:
                    return s
                      ? l
                        ? [2, this.pushCompressedSignedTransaction(y, h, c)]
                        : [2, this.pushSignedTransaction(y, h, c)]
                      : [2, y];
                }
              });
            });
          }),
          (t.prototype.query = function (t, e, r, o) {
            var s = o.sign,
              f = o.requiredKeys,
              u = o.authorization,
              c = void 0 === u ? [] : u;
            return n(this, void 0, void 0, function () {
              var n, o, u, d, l, p, b, m, y, v, g;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return [4, this.rpc.get_info()];
                  case 1:
                    return (n = a.sent()), [4, this.tryRefBlockFromGetInfo(n)];
                  case 2:
                    return (
                      (o = a.sent()),
                      (u = new h.SerialBuffer({
                        textEncoder: this.textEncoder,
                        textDecoder: this.textDecoder,
                      })),
                      h.serializeQuery(u, r),
                      (d = i(i({}, h.transactionHeader(o, 1800)), {
                        context_free_actions: [],
                        actions: [
                          {
                            account: t,
                            name: "queryit",
                            authorization: c,
                            data: h.arrayToHex(u.asUint8Array()),
                          },
                        ],
                      })),
                      (l = this.serializeTransaction(d)),
                      (p = []),
                      s ? [4, this.getTransactionAbis(d)] : [3, 8]
                    );
                  case 3:
                    return (
                      (b = a.sent()),
                      f
                        ? [3, 6]
                        : [4, this.signatureProvider.getAvailableKeys()]
                    );
                  case 4:
                    return (
                      (m = a.sent()),
                      [
                        4,
                        this.authorityProvider.getRequiredKeys({
                          transaction: d,
                          availableKeys: m,
                        }),
                      ]
                    );
                  case 5:
                    (f = a.sent()), (a.label = 6);
                  case 6:
                    return [
                      4,
                      this.signatureProvider.sign({
                        chainId: this.chainId,
                        requiredKeys: f,
                        serializedTransaction: l,
                        serializedContextFreeData: null,
                        abis: b,
                      }),
                    ];
                  case 7:
                    (y = a.sent()), (p = y.signatures), (a.label = 8);
                  case 8:
                    return [
                      4,
                      this.rpc.send_transaction({
                        signatures: p,
                        compression: 0,
                        serializedTransaction: l,
                      }),
                    ];
                  case 9:
                    return (
                      (v = a.sent()),
                      (g = new h.SerialBuffer({
                        textEncoder: this.textEncoder,
                        textDecoder: this.textDecoder,
                        array: h.hexToUint8Array(
                          v.processed.action_traces[0][1].return_value
                        ),
                      })),
                      e
                        ? [2, h.deserializeAnyvarShort(g)]
                        : [2, h.deserializeAnyvar(g)]
                    );
                }
              });
            });
          }),
          (t.prototype.pushSignedTransaction = function (t, e, r) {
            var i = t.signatures,
              o = t.serializedTransaction,
              s = t.serializedContextFreeData;
            return (
              void 0 === e && (e = !1),
              void 0 === r && (r = !1),
              n(this, void 0, void 0, function () {
                return a(this, function (t) {
                  return e
                    ? [
                        2,
                        this.rpc.push_ro_transaction(
                          {
                            signatures: i,
                            serializedTransaction: o,
                            serializedContextFreeData: s,
                          },
                          r
                        ),
                      ]
                    : [
                        2,
                        this.rpc.push_transaction({
                          signatures: i,
                          serializedTransaction: o,
                          serializedContextFreeData: s,
                        }),
                      ];
                });
              })
            );
          }),
          (t.prototype.pushCompressedSignedTransaction = function (t, e, r) {
            var i = t.signatures,
              o = t.serializedTransaction,
              s = t.serializedContextFreeData;
            return (
              void 0 === e && (e = !1),
              void 0 === r && (r = !1),
              n(this, void 0, void 0, function () {
                var t, n;
                return a(this, function (a) {
                  return (
                    (t = this.deflateSerializedArray(o)),
                    (n = this.deflateSerializedArray(s || new Uint8Array(0))),
                    e
                      ? [
                          2,
                          this.rpc.push_ro_transaction(
                            {
                              signatures: i,
                              compression: 1,
                              serializedTransaction: t,
                              serializedContextFreeData: n,
                            },
                            r
                          ),
                        ]
                      : [
                          2,
                          this.rpc.push_transaction({
                            signatures: i,
                            compression: 1,
                            serializedTransaction: t,
                            serializedContextFreeData: n,
                          }),
                        ]
                  );
                });
              })
            );
          }),
          (t.prototype.generateTapos = function (t, e, r, o, s) {
            return n(this, void 0, void 0, function () {
              var n, f, u, c;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return t ? [3, 2] : [4, this.rpc.get_info()];
                  case 1:
                    (t = a.sent()), (a.label = 2);
                  case 2:
                    return o ? [4, this.tryRefBlockFromGetInfo(t)] : [3, 4];
                  case 3:
                    return (
                      (n = a.sent()),
                      [2, i(i({}, h.transactionHeader(n, s)), e)]
                    );
                  case 4:
                    return (f = t.head_block_num - r) <=
                      t.last_irreversible_block_num
                      ? [4, this.tryGetBlockInfo(f)]
                      : [3, 6];
                  case 5:
                    return (c = a.sent()), [3, 8];
                  case 6:
                    return [4, this.tryGetBlockHeaderState(f)];
                  case 7:
                    (c = a.sent()), (a.label = 8);
                  case 8:
                    return (u = c), [2, i(i({}, h.transactionHeader(u, s)), e)];
                }
              });
            });
          }),
          (t.prototype.hasRequiredTaposFields = function (t) {
            var e = t.expiration,
              r = t.ref_block_num,
              i = t.ref_block_prefix;
            return !(!e || "number" != typeof r || "number" != typeof i);
          }),
          (t.prototype.tryGetBlockHeaderState = function (t) {
            return n(this, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return (
                      e.trys.push([0, 2, , 4]),
                      [4, this.rpc.get_block_header_state(t)]
                    );
                  case 1:
                    return [2, e.sent()];
                  case 2:
                    return e.sent(), [4, this.tryGetBlockInfo(t)];
                  case 3:
                    return [2, e.sent()];
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (t.prototype.tryGetBlockInfo = function (t) {
            return n(this, void 0, void 0, function () {
              return a(this, function (e) {
                switch (e.label) {
                  case 0:
                    return (
                      e.trys.push([0, 2, , 4]), [4, this.rpc.get_block_info(t)]
                    );
                  case 1:
                    return [2, e.sent()];
                  case 2:
                    return e.sent(), [4, this.rpc.get_block(t)];
                  case 3:
                    return [2, e.sent()];
                  case 4:
                    return [2];
                }
              });
            });
          }),
          (t.prototype.tryRefBlockFromGetInfo = function (t) {
            return n(this, void 0, void 0, function () {
              var e;
              return a(this, function (r) {
                switch (r.label) {
                  case 0:
                    return t.hasOwnProperty("last_irreversible_block_id") &&
                      t.hasOwnProperty("last_irreversible_block_num") &&
                      t.hasOwnProperty("last_irreversible_block_time")
                      ? [
                          2,
                          {
                            block_num: t.last_irreversible_block_num,
                            id: t.last_irreversible_block_id,
                            timestamp: t.last_irreversible_block_time,
                          },
                        ]
                      : [3, 1];
                  case 1:
                    return [
                      4,
                      this.tryGetBlockInfo(t.last_irreversible_block_num),
                    ];
                  case 2:
                    return [
                      2,
                      {
                        block_num: (e = r.sent()).block_num,
                        id: e.id,
                        timestamp: e.timestamp,
                      },
                    ];
                }
              });
            });
          }),
          (t.prototype.with = function (t) {
            return new l(this, t);
          }),
          (t.prototype.buildTransaction = function (t) {
            var e = new d(this);
            return t ? t(e) : e;
          }),
          t
        );
      })();
    e.Api = c;
    var d = (function () {
      function t(t) {
        (this.actions = []), (this.contextFreeGroups = []), (this.api = t);
      }
      return (
        (t.prototype.with = function (t) {
          var e = new l(this.api, t);
          return this.actions.push(e), e;
        }),
        (t.prototype.associateContextFree = function (t) {
          return this.contextFreeGroups.push(t), this;
        }),
        (t.prototype.send = function (t) {
          return n(this, void 0, void 0, function () {
            var e,
              r,
              i,
              o = this;
            return a(this, function (s) {
              switch (s.label) {
                case 0:
                  return (
                    (e = []),
                    (r = []),
                    (i = this.actions.map(function (t) {
                      return t.serializedData;
                    })),
                    [
                      4,
                      Promise.all(
                        this.contextFreeGroups.map(function (t) {
                          return n(o, void 0, void 0, function () {
                            var n, o, s, f;
                            return a(this, function (a) {
                              return (
                                (n = t({ cfd: e.length, cfa: r.length })),
                                (o = n.action),
                                (s = n.contextFreeAction),
                                (f = n.contextFreeData),
                                o && i.push(o),
                                s && r.push(s),
                                f && e.push(f),
                                [2]
                              );
                            });
                          });
                        })
                      ),
                    ]
                  );
                case 1:
                  return (
                    s.sent(),
                    (this.contextFreeGroups = []),
                    (this.actions = []),
                    [
                      4,
                      this.api.transact(
                        {
                          context_free_data: e,
                          context_free_actions: r,
                          actions: i,
                        },
                        t
                      ),
                    ]
                  );
                case 2:
                  return [2, s.sent()];
              }
            });
          });
        }),
        t
      );
    })();
    e.TransactionBuilder = d;
    var l = (function () {
      function t(t, e) {
        (this.api = t), (this.accountName = e);
      }
      return (
        (t.prototype.as = function (t) {
          void 0 === t && (t = []);
          var e = [];
          return (
            (e =
              t && "string" == typeof t
                ? [{ actor: t, permission: "active" }]
                : t),
            new p(this, this.api, this.accountName, e)
          );
        }),
        t
      );
    })();
    e.ActionBuilder = l;
    var p = function (t, e, r, i) {
      var n,
        a,
        o = this,
        s = e.cachedAbis.get(r);
      if (!s)
        throw new Error(
          "ABI must be cached before using ActionBuilder, run api.getAbi()"
        );
      var u = h.getTypesFromAbi(h.createInitialTypes(), s.abi),
        c = new Map();
      try {
        for (var d = f(s.abi.actions), l = d.next(); !l.done; l = d.next()) {
          var p = l.value,
            b = p.name,
            m = p.type;
          c.set(b, h.getType(u, m));
        }
      } catch (t) {
        n = { error: t };
      } finally {
        try {
          l && !l.done && (a = d.return) && a.call(d);
        } finally {
          if (n) throw n.error;
        }
      }
      c.forEach(function (n, a) {
        var s;
        Object.assign(
          o,
          (((s = {})[a] = function () {
            for (var o = [], s = 0; s < arguments.length; s++)
              o[s] = arguments[s];
            var f = {};
            o.forEach(function (t, e) {
              var r = n.fields[e];
              f[r.name] = t;
            });
            var d = h.serializeAction(
              { types: u, actions: c },
              r,
              a,
              i,
              f,
              e.textEncoder,
              e.textDecoder
            );
            return (t.serializedData = d), d;
          }),
          s)
        );
      });
    };
  },
  function (t, e, r) {
    "use strict";
    r.r(e),
      r.d(e, "Deflate", function () {
        return We;
      }),
      r.d(e, "Inflate", function () {
        return Qe;
      }),
      r.d(e, "constants", function () {
        return rr;
      }),
      r.d(e, "deflate", function () {
        return Je;
      }),
      r.d(e, "deflateRaw", function () {
        return Ge;
      }),
      r.d(e, "gzip", function () {
        return Xe;
      }),
      r.d(e, "inflate", function () {
        return $e;
      }),
      r.d(e, "inflateRaw", function () {
        return tr;
      }),
      r.d(e, "ungzip", function () {
        return er;
      });
    function i(t) {
      let e = t.length;
      for (; --e >= 0; ) t[e] = 0;
    }
    const n = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4,
        5, 5, 5, 5, 0,
      ]),
      a = new Uint8Array([
        0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,
        10, 11, 11, 12, 12, 13, 13,
      ]),
      o = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
      ]),
      s = new Uint8Array([
        16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
      ]),
      f = new Array(576);
    i(f);
    const u = new Array(60);
    i(u);
    const h = new Array(512);
    i(h);
    const c = new Array(256);
    i(c);
    const d = new Array(29);
    i(d);
    const l = new Array(30);
    function p(t, e, r, i, n) {
      (this.static_tree = t),
        (this.extra_bits = e),
        (this.extra_base = r),
        (this.elems = i),
        (this.max_length = n),
        (this.has_stree = t && t.length);
    }
    let b, m, y;
    function v(t, e) {
      (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
    }
    i(l);
    const g = (t) => (t < 256 ? h[t] : h[256 + (t >>> 7)]),
      w = (t, e) => {
        (t.pending_buf[t.pending++] = 255 & e),
          (t.pending_buf[t.pending++] = (e >>> 8) & 255);
      },
      _ = (t, e, r) => {
        t.bi_valid > 16 - r
          ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
            w(t, t.bi_buf),
            (t.bi_buf = e >> (16 - t.bi_valid)),
            (t.bi_valid += r - 16))
          : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += r));
      },
      M = (t, e, r) => {
        _(t, r[2 * e], r[2 * e + 1]);
      },
      A = (t, e) => {
        let r = 0;
        do {
          (r |= 1 & t), (t >>>= 1), (r <<= 1);
        } while (--e > 0);
        return r >>> 1;
      },
      x = (t, e, r) => {
        const i = new Array(16);
        let n,
          a,
          o = 0;
        for (n = 1; n <= 15; n++) i[n] = o = (o + r[n - 1]) << 1;
        for (a = 0; a <= e; a++) {
          let e = t[2 * a + 1];
          0 !== e && (t[2 * a] = A(i[e]++, e));
        }
      },
      S = (t) => {
        let e;
        for (e = 0; e < 286; e++) t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < 30; e++) t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
        (t.dyn_ltree[512] = 1),
          (t.opt_len = t.static_len = 0),
          (t.last_lit = t.matches = 0);
      },
      k = (t) => {
        t.bi_valid > 8
          ? w(t, t.bi_buf)
          : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
          (t.bi_buf = 0),
          (t.bi_valid = 0);
      },
      z = (t, e, r, i) => {
        const n = 2 * e,
          a = 2 * r;
        return t[n] < t[a] || (t[n] === t[a] && i[e] <= i[r]);
      },
      E = (t, e, r) => {
        const i = t.heap[r];
        let n = r << 1;
        for (
          ;
          n <= t.heap_len &&
          (n < t.heap_len && z(e, t.heap[n + 1], t.heap[n], t.depth) && n++,
          !z(e, i, t.heap[n], t.depth));

        )
          (t.heap[r] = t.heap[n]), (r = n), (n <<= 1);
        t.heap[r] = i;
      },
      T = (t, e, r) => {
        let i,
          o,
          s,
          f,
          u = 0;
        if (0 !== t.last_lit)
          do {
            (i =
              (t.pending_buf[t.d_buf + 2 * u] << 8) |
              t.pending_buf[t.d_buf + 2 * u + 1]),
              (o = t.pending_buf[t.l_buf + u]),
              u++,
              0 === i
                ? M(t, o, e)
                : ((s = c[o]),
                  M(t, s + 256 + 1, e),
                  (f = n[s]),
                  0 !== f && ((o -= d[s]), _(t, o, f)),
                  i--,
                  (s = g(i)),
                  M(t, s, r),
                  (f = a[s]),
                  0 !== f && ((i -= l[s]), _(t, i, f)));
          } while (u < t.last_lit);
        M(t, 256, e);
      },
      R = (t, e) => {
        const r = e.dyn_tree,
          i = e.stat_desc.static_tree,
          n = e.stat_desc.has_stree,
          a = e.stat_desc.elems;
        let o,
          s,
          f,
          u = -1;
        for (t.heap_len = 0, t.heap_max = 573, o = 0; o < a; o++)
          0 !== r[2 * o]
            ? ((t.heap[++t.heap_len] = u = o), (t.depth[o] = 0))
            : (r[2 * o + 1] = 0);
        for (; t.heap_len < 2; )
          (f = t.heap[++t.heap_len] = u < 2 ? ++u : 0),
            (r[2 * f] = 1),
            (t.depth[f] = 0),
            t.opt_len--,
            n && (t.static_len -= i[2 * f + 1]);
        for (e.max_code = u, o = t.heap_len >> 1; o >= 1; o--) E(t, r, o);
        f = a;
        do {
          (o = t.heap[1]),
            (t.heap[1] = t.heap[t.heap_len--]),
            E(t, r, 1),
            (s = t.heap[1]),
            (t.heap[--t.heap_max] = o),
            (t.heap[--t.heap_max] = s),
            (r[2 * f] = r[2 * o] + r[2 * s]),
            (t.depth[f] =
              (t.depth[o] >= t.depth[s] ? t.depth[o] : t.depth[s]) + 1),
            (r[2 * o + 1] = r[2 * s + 1] = f),
            (t.heap[1] = f++),
            E(t, r, 1);
        } while (t.heap_len >= 2);
        (t.heap[--t.heap_max] = t.heap[1]),
          ((t, e) => {
            const r = e.dyn_tree,
              i = e.max_code,
              n = e.stat_desc.static_tree,
              a = e.stat_desc.has_stree,
              o = e.stat_desc.extra_bits,
              s = e.stat_desc.extra_base,
              f = e.stat_desc.max_length;
            let u,
              h,
              c,
              d,
              l,
              p,
              b = 0;
            for (d = 0; d <= 15; d++) t.bl_count[d] = 0;
            for (
              r[2 * t.heap[t.heap_max] + 1] = 0, u = t.heap_max + 1;
              u < 573;
              u++
            )
              (h = t.heap[u]),
                (d = r[2 * r[2 * h + 1] + 1] + 1),
                d > f && ((d = f), b++),
                (r[2 * h + 1] = d),
                h > i ||
                  (t.bl_count[d]++,
                  (l = 0),
                  h >= s && (l = o[h - s]),
                  (p = r[2 * h]),
                  (t.opt_len += p * (d + l)),
                  a && (t.static_len += p * (n[2 * h + 1] + l)));
            if (0 !== b) {
              do {
                for (d = f - 1; 0 === t.bl_count[d]; ) d--;
                t.bl_count[d]--,
                  (t.bl_count[d + 1] += 2),
                  t.bl_count[f]--,
                  (b -= 2);
              } while (b > 0);
              for (d = f; 0 !== d; d--)
                for (h = t.bl_count[d]; 0 !== h; )
                  (c = t.heap[--u]),
                    c > i ||
                      (r[2 * c + 1] !== d &&
                        ((t.opt_len += (d - r[2 * c + 1]) * r[2 * c]),
                        (r[2 * c + 1] = d)),
                      h--);
            }
          })(t, e),
          x(r, u, t.bl_count);
      },
      P = (t, e, r) => {
        let i,
          n,
          a = -1,
          o = e[1],
          s = 0,
          f = 7,
          u = 4;
        for (
          0 === o && ((f = 138), (u = 3)), e[2 * (r + 1) + 1] = 65535, i = 0;
          i <= r;
          i++
        )
          (n = o),
            (o = e[2 * (i + 1) + 1]),
            (++s < f && n === o) ||
              (s < u
                ? (t.bl_tree[2 * n] += s)
                : 0 !== n
                ? (n !== a && t.bl_tree[2 * n]++, t.bl_tree[32]++)
                : s <= 10
                ? t.bl_tree[34]++
                : t.bl_tree[36]++,
              (s = 0),
              (a = n),
              0 === o
                ? ((f = 138), (u = 3))
                : n === o
                ? ((f = 6), (u = 3))
                : ((f = 7), (u = 4)));
      },
      I = (t, e, r) => {
        let i,
          n,
          a = -1,
          o = e[1],
          s = 0,
          f = 7,
          u = 4;
        for (0 === o && ((f = 138), (u = 3)), i = 0; i <= r; i++)
          if (((n = o), (o = e[2 * (i + 1) + 1]), !(++s < f && n === o))) {
            if (s < u)
              do {
                M(t, n, t.bl_tree);
              } while (0 != --s);
            else
              0 !== n
                ? (n !== a && (M(t, n, t.bl_tree), s--),
                  M(t, 16, t.bl_tree),
                  _(t, s - 3, 2))
                : s <= 10
                ? (M(t, 17, t.bl_tree), _(t, s - 3, 3))
                : (M(t, 18, t.bl_tree), _(t, s - 11, 7));
            (s = 0),
              (a = n),
              0 === o
                ? ((f = 138), (u = 3))
                : n === o
                ? ((f = 6), (u = 3))
                : ((f = 7), (u = 4));
          }
      };
    let N = !1;
    const U = (t, e, r, i) => {
      _(t, 0 + (i ? 1 : 0), 3),
        ((t, e, r, i) => {
          k(t),
            i && (w(t, r), w(t, ~r)),
            t.pending_buf.set(t.window.subarray(e, e + r), t.pending),
            (t.pending += r);
        })(t, e, r, !0);
    };
    var B = {
      _tr_init: (t) => {
        N ||
          ((() => {
            let t, e, r, i, s;
            const v = new Array(16);
            for (r = 0, i = 0; i < 28; i++)
              for (d[i] = r, t = 0; t < 1 << n[i]; t++) c[r++] = i;
            for (c[r - 1] = i, s = 0, i = 0; i < 16; i++)
              for (l[i] = s, t = 0; t < 1 << a[i]; t++) h[s++] = i;
            for (s >>= 7; i < 30; i++)
              for (l[i] = s << 7, t = 0; t < 1 << (a[i] - 7); t++)
                h[256 + s++] = i;
            for (e = 0; e <= 15; e++) v[e] = 0;
            for (t = 0; t <= 143; ) (f[2 * t + 1] = 8), t++, v[8]++;
            for (; t <= 255; ) (f[2 * t + 1] = 9), t++, v[9]++;
            for (; t <= 279; ) (f[2 * t + 1] = 7), t++, v[7]++;
            for (; t <= 287; ) (f[2 * t + 1] = 8), t++, v[8]++;
            for (x(f, 287, v), t = 0; t < 30; t++)
              (u[2 * t + 1] = 5), (u[2 * t] = A(t, 5));
            (b = new p(f, n, 257, 286, 15)),
              (m = new p(u, a, 0, 30, 15)),
              (y = new p(new Array(0), o, 0, 19, 7));
          })(),
          (N = !0)),
          (t.l_desc = new v(t.dyn_ltree, b)),
          (t.d_desc = new v(t.dyn_dtree, m)),
          (t.bl_desc = new v(t.bl_tree, y)),
          (t.bi_buf = 0),
          (t.bi_valid = 0),
          S(t);
      },
      _tr_stored_block: U,
      _tr_flush_block: (t, e, r, i) => {
        let n,
          a,
          o = 0;
        t.level > 0
          ? (2 === t.strm.data_type &&
              (t.strm.data_type = ((t) => {
                let e,
                  r = 4093624447;
                for (e = 0; e <= 31; e++, r >>>= 1)
                  if (1 & r && 0 !== t.dyn_ltree[2 * e]) return 0;
                if (
                  0 !== t.dyn_ltree[18] ||
                  0 !== t.dyn_ltree[20] ||
                  0 !== t.dyn_ltree[26]
                )
                  return 1;
                for (e = 32; e < 256; e++)
                  if (0 !== t.dyn_ltree[2 * e]) return 1;
                return 0;
              })(t)),
            R(t, t.l_desc),
            R(t, t.d_desc),
            (o = ((t) => {
              let e;
              for (
                P(t, t.dyn_ltree, t.l_desc.max_code),
                  P(t, t.dyn_dtree, t.d_desc.max_code),
                  R(t, t.bl_desc),
                  e = 18;
                e >= 3 && 0 === t.bl_tree[2 * s[e] + 1];
                e--
              );
              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
            })(t)),
            (n = (t.opt_len + 3 + 7) >>> 3),
            (a = (t.static_len + 3 + 7) >>> 3),
            a <= n && (n = a))
          : (n = a = r + 5),
          r + 4 <= n && -1 !== e
            ? U(t, e, r, i)
            : 4 === t.strategy || a === n
            ? (_(t, 2 + (i ? 1 : 0), 3), T(t, f, u))
            : (_(t, 4 + (i ? 1 : 0), 3),
              ((t, e, r, i) => {
                let n;
                for (
                  _(t, e - 257, 5), _(t, r - 1, 5), _(t, i - 4, 4), n = 0;
                  n < i;
                  n++
                )
                  _(t, t.bl_tree[2 * s[n] + 1], 3);
                I(t, t.dyn_ltree, e - 1), I(t, t.dyn_dtree, r - 1);
              })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1),
              T(t, t.dyn_ltree, t.dyn_dtree)),
          S(t),
          i && k(t);
      },
      _tr_tally: (t, e, r) => (
        (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
        (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
        (t.pending_buf[t.l_buf + t.last_lit] = 255 & r),
        t.last_lit++,
        0 === e
          ? t.dyn_ltree[2 * r]++
          : (t.matches++,
            e--,
            t.dyn_ltree[2 * (c[r] + 256 + 1)]++,
            t.dyn_dtree[2 * g(e)]++),
        t.last_lit === t.lit_bufsize - 1
      ),
      _tr_align: (t) => {
        _(t, 2, 3),
          M(t, 256, f),
          ((t) => {
            16 === t.bi_valid
              ? (w(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
              : t.bi_valid >= 8 &&
                ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
                (t.bi_buf >>= 8),
                (t.bi_valid -= 8));
          })(t);
      },
    };
    var O = (t, e, r, i) => {
      let n = (65535 & t) | 0,
        a = ((t >>> 16) & 65535) | 0,
        o = 0;
      for (; 0 !== r; ) {
        (o = r > 2e3 ? 2e3 : r), (r -= o);
        do {
          (n = (n + e[i++]) | 0), (a = (a + n) | 0);
        } while (--o);
        (n %= 65521), (a %= 65521);
      }
      return n | (a << 16) | 0;
    };
    const D = new Uint32Array(
      (() => {
        let t,
          e = [];
        for (var r = 0; r < 256; r++) {
          t = r;
          for (var i = 0; i < 8; i++)
            t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
          e[r] = t;
        }
        return e;
      })()
    );
    var L = (t, e, r, i) => {
        const n = D,
          a = i + r;
        t ^= -1;
        for (let r = i; r < a; r++) t = (t >>> 8) ^ n[255 & (t ^ e[r])];
        return -1 ^ t;
      },
      K = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version",
      },
      C = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8,
      };
    const {
        _tr_init: j,
        _tr_stored_block: q,
        _tr_flush_block: F,
        _tr_tally: Z,
        _tr_align: V,
      } = B,
      {
        Z_NO_FLUSH: Y,
        Z_PARTIAL_FLUSH: H,
        Z_FULL_FLUSH: W,
        Z_FINISH: J,
        Z_BLOCK: G,
        Z_OK: X,
        Z_STREAM_END: Q,
        Z_STREAM_ERROR: $,
        Z_DATA_ERROR: tt,
        Z_BUF_ERROR: et,
        Z_DEFAULT_COMPRESSION: rt,
        Z_FILTERED: it,
        Z_HUFFMAN_ONLY: nt,
        Z_RLE: at,
        Z_FIXED: ot,
        Z_DEFAULT_STRATEGY: st,
        Z_UNKNOWN: ft,
        Z_DEFLATED: ut,
      } = C,
      ht = (t, e) => ((t.msg = K[e]), e),
      ct = (t) => (t << 1) - (t > 4 ? 9 : 0),
      dt = (t) => {
        let e = t.length;
        for (; --e >= 0; ) t[e] = 0;
      };
    let lt = (t, e, r) => ((e << t.hash_shift) ^ r) & t.hash_mask;
    const pt = (t) => {
        const e = t.state;
        let r = e.pending;
        r > t.avail_out && (r = t.avail_out),
          0 !== r &&
            (t.output.set(
              e.pending_buf.subarray(e.pending_out, e.pending_out + r),
              t.next_out
            ),
            (t.next_out += r),
            (e.pending_out += r),
            (t.total_out += r),
            (t.avail_out -= r),
            (e.pending -= r),
            0 === e.pending && (e.pending_out = 0));
      },
      bt = (t, e) => {
        F(
          t,
          t.block_start >= 0 ? t.block_start : -1,
          t.strstart - t.block_start,
          e
        ),
          (t.block_start = t.strstart),
          pt(t.strm);
      },
      mt = (t, e) => {
        t.pending_buf[t.pending++] = e;
      },
      yt = (t, e) => {
        (t.pending_buf[t.pending++] = (e >>> 8) & 255),
          (t.pending_buf[t.pending++] = 255 & e);
      },
      vt = (t, e, r, i) => {
        let n = t.avail_in;
        return (
          n > i && (n = i),
          0 === n
            ? 0
            : ((t.avail_in -= n),
              e.set(t.input.subarray(t.next_in, t.next_in + n), r),
              1 === t.state.wrap
                ? (t.adler = O(t.adler, e, n, r))
                : 2 === t.state.wrap && (t.adler = L(t.adler, e, n, r)),
              (t.next_in += n),
              (t.total_in += n),
              n)
        );
      },
      gt = (t, e) => {
        let r,
          i,
          n = t.max_chain_length,
          a = t.strstart,
          o = t.prev_length,
          s = t.nice_match;
        const f =
            t.strstart > t.w_size - 262 ? t.strstart - (t.w_size - 262) : 0,
          u = t.window,
          h = t.w_mask,
          c = t.prev,
          d = t.strstart + 258;
        let l = u[a + o - 1],
          p = u[a + o];
        t.prev_length >= t.good_match && (n >>= 2),
          s > t.lookahead && (s = t.lookahead);
        do {
          if (
            ((r = e),
            u[r + o] === p &&
              u[r + o - 1] === l &&
              u[r] === u[a] &&
              u[++r] === u[a + 1])
          ) {
            (a += 2), r++;
            do {} while (
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              u[++a] === u[++r] &&
              a < d
            );
            if (((i = 258 - (d - a)), (a = d - 258), i > o)) {
              if (((t.match_start = e), (o = i), i >= s)) break;
              (l = u[a + o - 1]), (p = u[a + o]);
            }
          }
        } while ((e = c[e & h]) > f && 0 != --n);
        return o <= t.lookahead ? o : t.lookahead;
      },
      wt = (t) => {
        const e = t.w_size;
        let r, i, n, a, o;
        do {
          if (
            ((a = t.window_size - t.lookahead - t.strstart),
            t.strstart >= e + (e - 262))
          ) {
            t.window.set(t.window.subarray(e, e + e), 0),
              (t.match_start -= e),
              (t.strstart -= e),
              (t.block_start -= e),
              (i = t.hash_size),
              (r = i);
            do {
              (n = t.head[--r]), (t.head[r] = n >= e ? n - e : 0);
            } while (--i);
            (i = e), (r = i);
            do {
              (n = t.prev[--r]), (t.prev[r] = n >= e ? n - e : 0);
            } while (--i);
            a += e;
          }
          if (0 === t.strm.avail_in) break;
          if (
            ((i = vt(t.strm, t.window, t.strstart + t.lookahead, a)),
            (t.lookahead += i),
            t.lookahead + t.insert >= 3)
          )
            for (
              o = t.strstart - t.insert,
                t.ins_h = t.window[o],
                t.ins_h = lt(t, t.ins_h, t.window[o + 1]);
              t.insert &&
              ((t.ins_h = lt(t, t.ins_h, t.window[o + 3 - 1])),
              (t.prev[o & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = o),
              o++,
              t.insert--,
              !(t.lookahead + t.insert < 3));

            );
        } while (t.lookahead < 262 && 0 !== t.strm.avail_in);
      },
      _t = (t, e) => {
        let r, i;
        for (;;) {
          if (t.lookahead < 262) {
            if ((wt(t), t.lookahead < 262 && e === Y)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((r = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = lt(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            0 !== r &&
              t.strstart - r <= t.w_size - 262 &&
              (t.match_length = gt(t, r)),
            t.match_length >= 3)
          )
            if (
              ((i = Z(t, t.strstart - t.match_start, t.match_length - 3)),
              (t.lookahead -= t.match_length),
              t.match_length <= t.max_lazy_match && t.lookahead >= 3)
            ) {
              t.match_length--;
              do {
                t.strstart++,
                  (t.ins_h = lt(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                  (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                  (t.head[t.ins_h] = t.strstart);
              } while (0 != --t.match_length);
              t.strstart++;
            } else
              (t.strstart += t.match_length),
                (t.match_length = 0),
                (t.ins_h = t.window[t.strstart]),
                (t.ins_h = lt(t, t.ins_h, t.window[t.strstart + 1]));
          else (i = Z(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
          if (i && (bt(t, !1), 0 === t.strm.avail_out)) return 1;
        }
        return (
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === J
            ? (bt(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.last_lit && (bt(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      },
      Mt = (t, e) => {
        let r, i, n;
        for (;;) {
          if (t.lookahead < 262) {
            if ((wt(t), t.lookahead < 262 && e === Y)) return 1;
            if (0 === t.lookahead) break;
          }
          if (
            ((r = 0),
            t.lookahead >= 3 &&
              ((t.ins_h = lt(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart)),
            (t.prev_length = t.match_length),
            (t.prev_match = t.match_start),
            (t.match_length = 2),
            0 !== r &&
              t.prev_length < t.max_lazy_match &&
              t.strstart - r <= t.w_size - 262 &&
              ((t.match_length = gt(t, r)),
              t.match_length <= 5 &&
                (t.strategy === it ||
                  (3 === t.match_length &&
                    t.strstart - t.match_start > 4096)) &&
                (t.match_length = 2)),
            t.prev_length >= 3 && t.match_length <= t.prev_length)
          ) {
            (n = t.strstart + t.lookahead - 3),
              (i = Z(t, t.strstart - 1 - t.prev_match, t.prev_length - 3)),
              (t.lookahead -= t.prev_length - 1),
              (t.prev_length -= 2);
            do {
              ++t.strstart <= n &&
                ((t.ins_h = lt(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                (r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart));
            } while (0 != --t.prev_length);
            if (
              ((t.match_available = 0),
              (t.match_length = 2),
              t.strstart++,
              i && (bt(t, !1), 0 === t.strm.avail_out))
            )
              return 1;
          } else if (t.match_available) {
            if (
              ((i = Z(t, 0, t.window[t.strstart - 1])),
              i && bt(t, !1),
              t.strstart++,
              t.lookahead--,
              0 === t.strm.avail_out)
            )
              return 1;
          } else (t.match_available = 1), t.strstart++, t.lookahead--;
        }
        return (
          t.match_available &&
            ((i = Z(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
          (t.insert = t.strstart < 2 ? t.strstart : 2),
          e === J
            ? (bt(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : t.last_lit && (bt(t, !1), 0 === t.strm.avail_out)
            ? 1
            : 2
        );
      };
    function At(t, e, r, i, n) {
      (this.good_length = t),
        (this.max_lazy = e),
        (this.nice_length = r),
        (this.max_chain = i),
        (this.func = n);
    }
    const xt = [
      new At(0, 0, 0, 0, (t, e) => {
        let r = 65535;
        for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if ((wt(t), 0 === t.lookahead && e === Y)) return 1;
            if (0 === t.lookahead) break;
          }
          (t.strstart += t.lookahead), (t.lookahead = 0);
          const i = t.block_start + r;
          if (
            (0 === t.strstart || t.strstart >= i) &&
            ((t.lookahead = t.strstart - i),
            (t.strstart = i),
            bt(t, !1),
            0 === t.strm.avail_out)
          )
            return 1;
          if (
            t.strstart - t.block_start >= t.w_size - 262 &&
            (bt(t, !1), 0 === t.strm.avail_out)
          )
            return 1;
        }
        return (
          (t.insert = 0),
          e === J
            ? (bt(t, !0), 0 === t.strm.avail_out ? 3 : 4)
            : (t.strstart > t.block_start && (bt(t, !1), t.strm.avail_out), 1)
        );
      }),
      new At(4, 4, 8, 4, _t),
      new At(4, 5, 16, 8, _t),
      new At(4, 6, 32, 32, _t),
      new At(4, 4, 16, 16, Mt),
      new At(8, 16, 32, 32, Mt),
      new At(8, 16, 128, 128, Mt),
      new At(8, 32, 128, 256, Mt),
      new At(32, 128, 258, 1024, Mt),
      new At(32, 258, 258, 4096, Mt),
    ];
    function St() {
      (this.strm = null),
        (this.status = 0),
        (this.pending_buf = null),
        (this.pending_buf_size = 0),
        (this.pending_out = 0),
        (this.pending = 0),
        (this.wrap = 0),
        (this.gzhead = null),
        (this.gzindex = 0),
        (this.method = ut),
        (this.last_flush = -1),
        (this.w_size = 0),
        (this.w_bits = 0),
        (this.w_mask = 0),
        (this.window = null),
        (this.window_size = 0),
        (this.prev = null),
        (this.head = null),
        (this.ins_h = 0),
        (this.hash_size = 0),
        (this.hash_bits = 0),
        (this.hash_mask = 0),
        (this.hash_shift = 0),
        (this.block_start = 0),
        (this.match_length = 0),
        (this.prev_match = 0),
        (this.match_available = 0),
        (this.strstart = 0),
        (this.match_start = 0),
        (this.lookahead = 0),
        (this.prev_length = 0),
        (this.max_chain_length = 0),
        (this.max_lazy_match = 0),
        (this.level = 0),
        (this.strategy = 0),
        (this.good_match = 0),
        (this.nice_match = 0),
        (this.dyn_ltree = new Uint16Array(1146)),
        (this.dyn_dtree = new Uint16Array(122)),
        (this.bl_tree = new Uint16Array(78)),
        dt(this.dyn_ltree),
        dt(this.dyn_dtree),
        dt(this.bl_tree),
        (this.l_desc = null),
        (this.d_desc = null),
        (this.bl_desc = null),
        (this.bl_count = new Uint16Array(16)),
        (this.heap = new Uint16Array(573)),
        dt(this.heap),
        (this.heap_len = 0),
        (this.heap_max = 0),
        (this.depth = new Uint16Array(573)),
        dt(this.depth),
        (this.l_buf = 0),
        (this.lit_bufsize = 0),
        (this.last_lit = 0),
        (this.d_buf = 0),
        (this.opt_len = 0),
        (this.static_len = 0),
        (this.matches = 0),
        (this.insert = 0),
        (this.bi_buf = 0),
        (this.bi_valid = 0);
    }
    const kt = (t) => {
        if (!t || !t.state) return ht(t, $);
        (t.total_in = t.total_out = 0), (t.data_type = ft);
        const e = t.state;
        return (
          (e.pending = 0),
          (e.pending_out = 0),
          e.wrap < 0 && (e.wrap = -e.wrap),
          (e.status = e.wrap ? 42 : 113),
          (t.adler = 2 === e.wrap ? 0 : 1),
          (e.last_flush = Y),
          j(e),
          X
        );
      },
      zt = (t) => {
        const e = kt(t);
        var r;
        return (
          e === X &&
            (((r = t.state).window_size = 2 * r.w_size),
            dt(r.head),
            (r.max_lazy_match = xt[r.level].max_lazy),
            (r.good_match = xt[r.level].good_length),
            (r.nice_match = xt[r.level].nice_length),
            (r.max_chain_length = xt[r.level].max_chain),
            (r.strstart = 0),
            (r.block_start = 0),
            (r.lookahead = 0),
            (r.insert = 0),
            (r.match_length = r.prev_length = 2),
            (r.match_available = 0),
            (r.ins_h = 0)),
          e
        );
      },
      Et = (t, e, r, i, n, a) => {
        if (!t) return $;
        let o = 1;
        if (
          (e === rt && (e = 6),
          i < 0 ? ((o = 0), (i = -i)) : i > 15 && ((o = 2), (i -= 16)),
          n < 1 ||
            n > 9 ||
            r !== ut ||
            i < 8 ||
            i > 15 ||
            e < 0 ||
            e > 9 ||
            a < 0 ||
            a > ot)
        )
          return ht(t, $);
        8 === i && (i = 9);
        const s = new St();
        return (
          (t.state = s),
          (s.strm = t),
          (s.wrap = o),
          (s.gzhead = null),
          (s.w_bits = i),
          (s.w_size = 1 << s.w_bits),
          (s.w_mask = s.w_size - 1),
          (s.hash_bits = n + 7),
          (s.hash_size = 1 << s.hash_bits),
          (s.hash_mask = s.hash_size - 1),
          (s.hash_shift = ~~((s.hash_bits + 3 - 1) / 3)),
          (s.window = new Uint8Array(2 * s.w_size)),
          (s.head = new Uint16Array(s.hash_size)),
          (s.prev = new Uint16Array(s.w_size)),
          (s.lit_bufsize = 1 << (n + 6)),
          (s.pending_buf_size = 4 * s.lit_bufsize),
          (s.pending_buf = new Uint8Array(s.pending_buf_size)),
          (s.d_buf = 1 * s.lit_bufsize),
          (s.l_buf = 3 * s.lit_bufsize),
          (s.level = e),
          (s.strategy = a),
          (s.method = r),
          zt(t)
        );
      };
    var Tt = {
      deflateInit: (t, e) => Et(t, e, ut, 15, 8, st),
      deflateInit2: Et,
      deflateReset: zt,
      deflateResetKeep: kt,
      deflateSetHeader: (t, e) =>
        t && t.state ? (2 !== t.state.wrap ? $ : ((t.state.gzhead = e), X)) : $,
      deflate: (t, e) => {
        let r, i;
        if (!t || !t.state || e > G || e < 0) return t ? ht(t, $) : $;
        const n = t.state;
        if (
          !t.output ||
          (!t.input && 0 !== t.avail_in) ||
          (666 === n.status && e !== J)
        )
          return ht(t, 0 === t.avail_out ? et : $);
        n.strm = t;
        const a = n.last_flush;
        if (((n.last_flush = e), 42 === n.status))
          if (2 === n.wrap)
            (t.adler = 0),
              mt(n, 31),
              mt(n, 139),
              mt(n, 8),
              n.gzhead
                ? (mt(
                    n,
                    (n.gzhead.text ? 1 : 0) +
                      (n.gzhead.hcrc ? 2 : 0) +
                      (n.gzhead.extra ? 4 : 0) +
                      (n.gzhead.name ? 8 : 0) +
                      (n.gzhead.comment ? 16 : 0)
                  ),
                  mt(n, 255 & n.gzhead.time),
                  mt(n, (n.gzhead.time >> 8) & 255),
                  mt(n, (n.gzhead.time >> 16) & 255),
                  mt(n, (n.gzhead.time >> 24) & 255),
                  mt(
                    n,
                    9 === n.level ? 2 : n.strategy >= nt || n.level < 2 ? 4 : 0
                  ),
                  mt(n, 255 & n.gzhead.os),
                  n.gzhead.extra &&
                    n.gzhead.extra.length &&
                    (mt(n, 255 & n.gzhead.extra.length),
                    mt(n, (n.gzhead.extra.length >> 8) & 255)),
                  n.gzhead.hcrc &&
                    (t.adler = L(t.adler, n.pending_buf, n.pending, 0)),
                  (n.gzindex = 0),
                  (n.status = 69))
                : (mt(n, 0),
                  mt(n, 0),
                  mt(n, 0),
                  mt(n, 0),
                  mt(n, 0),
                  mt(
                    n,
                    9 === n.level ? 2 : n.strategy >= nt || n.level < 2 ? 4 : 0
                  ),
                  mt(n, 3),
                  (n.status = 113));
          else {
            let e = (ut + ((n.w_bits - 8) << 4)) << 8,
              r = -1;
            (r =
              n.strategy >= nt || n.level < 2
                ? 0
                : n.level < 6
                ? 1
                : 6 === n.level
                ? 2
                : 3),
              (e |= r << 6),
              0 !== n.strstart && (e |= 32),
              (e += 31 - (e % 31)),
              (n.status = 113),
              yt(n, e),
              0 !== n.strstart &&
                (yt(n, t.adler >>> 16), yt(n, 65535 & t.adler)),
              (t.adler = 1);
          }
        if (69 === n.status)
          if (n.gzhead.extra) {
            for (
              r = n.pending;
              n.gzindex < (65535 & n.gzhead.extra.length) &&
              (n.pending !== n.pending_buf_size ||
                (n.gzhead.hcrc &&
                  n.pending > r &&
                  (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
                pt(t),
                (r = n.pending),
                n.pending !== n.pending_buf_size));

            )
              mt(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
            n.gzhead.hcrc &&
              n.pending > r &&
              (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
              n.gzindex === n.gzhead.extra.length &&
                ((n.gzindex = 0), (n.status = 73));
          } else n.status = 73;
        if (73 === n.status)
          if (n.gzhead.name) {
            r = n.pending;
            do {
              if (
                n.pending === n.pending_buf_size &&
                (n.gzhead.hcrc &&
                  n.pending > r &&
                  (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
                pt(t),
                (r = n.pending),
                n.pending === n.pending_buf_size)
              ) {
                i = 1;
                break;
              }
              (i =
                n.gzindex < n.gzhead.name.length
                  ? 255 & n.gzhead.name.charCodeAt(n.gzindex++)
                  : 0),
                mt(n, i);
            } while (0 !== i);
            n.gzhead.hcrc &&
              n.pending > r &&
              (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
              0 === i && ((n.gzindex = 0), (n.status = 91));
          } else n.status = 91;
        if (91 === n.status)
          if (n.gzhead.comment) {
            r = n.pending;
            do {
              if (
                n.pending === n.pending_buf_size &&
                (n.gzhead.hcrc &&
                  n.pending > r &&
                  (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
                pt(t),
                (r = n.pending),
                n.pending === n.pending_buf_size)
              ) {
                i = 1;
                break;
              }
              (i =
                n.gzindex < n.gzhead.comment.length
                  ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++)
                  : 0),
                mt(n, i);
            } while (0 !== i);
            n.gzhead.hcrc &&
              n.pending > r &&
              (t.adler = L(t.adler, n.pending_buf, n.pending - r, r)),
              0 === i && (n.status = 103);
          } else n.status = 103;
        if (
          (103 === n.status &&
            (n.gzhead.hcrc
              ? (n.pending + 2 > n.pending_buf_size && pt(t),
                n.pending + 2 <= n.pending_buf_size &&
                  (mt(n, 255 & t.adler),
                  mt(n, (t.adler >> 8) & 255),
                  (t.adler = 0),
                  (n.status = 113)))
              : (n.status = 113)),
          0 !== n.pending)
        ) {
          if ((pt(t), 0 === t.avail_out)) return (n.last_flush = -1), X;
        } else if (0 === t.avail_in && ct(e) <= ct(a) && e !== J)
          return ht(t, et);
        if (666 === n.status && 0 !== t.avail_in) return ht(t, et);
        if (
          0 !== t.avail_in ||
          0 !== n.lookahead ||
          (e !== Y && 666 !== n.status)
        ) {
          let r =
            n.strategy === nt
              ? ((t, e) => {
                  let r;
                  for (;;) {
                    if (0 === t.lookahead && (wt(t), 0 === t.lookahead)) {
                      if (e === Y) return 1;
                      break;
                    }
                    if (
                      ((t.match_length = 0),
                      (r = Z(t, 0, t.window[t.strstart])),
                      t.lookahead--,
                      t.strstart++,
                      r && (bt(t, !1), 0 === t.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (t.insert = 0),
                    e === J
                      ? (bt(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                      : t.last_lit && (bt(t, !1), 0 === t.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(n, e)
              : n.strategy === at
              ? ((t, e) => {
                  let r, i, n, a;
                  const o = t.window;
                  for (;;) {
                    if (t.lookahead <= 258) {
                      if ((wt(t), t.lookahead <= 258 && e === Y)) return 1;
                      if (0 === t.lookahead) break;
                    }
                    if (
                      ((t.match_length = 0),
                      t.lookahead >= 3 &&
                        t.strstart > 0 &&
                        ((n = t.strstart - 1),
                        (i = o[n]),
                        i === o[++n] && i === o[++n] && i === o[++n]))
                    ) {
                      a = t.strstart + 258;
                      do {} while (
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        i === o[++n] &&
                        n < a
                      );
                      (t.match_length = 258 - (a - n)),
                        t.match_length > t.lookahead &&
                          (t.match_length = t.lookahead);
                    }
                    if (
                      (t.match_length >= 3
                        ? ((r = Z(t, 1, t.match_length - 3)),
                          (t.lookahead -= t.match_length),
                          (t.strstart += t.match_length),
                          (t.match_length = 0))
                        : ((r = Z(t, 0, t.window[t.strstart])),
                          t.lookahead--,
                          t.strstart++),
                      r && (bt(t, !1), 0 === t.strm.avail_out))
                    )
                      return 1;
                  }
                  return (
                    (t.insert = 0),
                    e === J
                      ? (bt(t, !0), 0 === t.strm.avail_out ? 3 : 4)
                      : t.last_lit && (bt(t, !1), 0 === t.strm.avail_out)
                      ? 1
                      : 2
                  );
                })(n, e)
              : xt[n.level].func(n, e);
          if (((3 !== r && 4 !== r) || (n.status = 666), 1 === r || 3 === r))
            return 0 === t.avail_out && (n.last_flush = -1), X;
          if (
            2 === r &&
            (e === H
              ? V(n)
              : e !== G &&
                (q(n, 0, 0, !1),
                e === W &&
                  (dt(n.head),
                  0 === n.lookahead &&
                    ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
            pt(t),
            0 === t.avail_out)
          )
            return (n.last_flush = -1), X;
        }
        return e !== J
          ? X
          : n.wrap <= 0
          ? Q
          : (2 === n.wrap
              ? (mt(n, 255 & t.adler),
                mt(n, (t.adler >> 8) & 255),
                mt(n, (t.adler >> 16) & 255),
                mt(n, (t.adler >> 24) & 255),
                mt(n, 255 & t.total_in),
                mt(n, (t.total_in >> 8) & 255),
                mt(n, (t.total_in >> 16) & 255),
                mt(n, (t.total_in >> 24) & 255))
              : (yt(n, t.adler >>> 16), yt(n, 65535 & t.adler)),
            pt(t),
            n.wrap > 0 && (n.wrap = -n.wrap),
            0 !== n.pending ? X : Q);
      },
      deflateEnd: (t) => {
        if (!t || !t.state) return $;
        const e = t.state.status;
        return 42 !== e &&
          69 !== e &&
          73 !== e &&
          91 !== e &&
          103 !== e &&
          113 !== e &&
          666 !== e
          ? ht(t, $)
          : ((t.state = null), 113 === e ? ht(t, tt) : X);
      },
      deflateSetDictionary: (t, e) => {
        let r = e.length;
        if (!t || !t.state) return $;
        const i = t.state,
          n = i.wrap;
        if (2 === n || (1 === n && 42 !== i.status) || i.lookahead) return $;
        if (
          (1 === n && (t.adler = O(t.adler, e, r, 0)),
          (i.wrap = 0),
          r >= i.w_size)
        ) {
          0 === n &&
            (dt(i.head), (i.strstart = 0), (i.block_start = 0), (i.insert = 0));
          let t = new Uint8Array(i.w_size);
          t.set(e.subarray(r - i.w_size, r), 0), (e = t), (r = i.w_size);
        }
        const a = t.avail_in,
          o = t.next_in,
          s = t.input;
        for (
          t.avail_in = r, t.next_in = 0, t.input = e, wt(i);
          i.lookahead >= 3;

        ) {
          let t = i.strstart,
            e = i.lookahead - 2;
          do {
            (i.ins_h = lt(i, i.ins_h, i.window[t + 3 - 1])),
              (i.prev[t & i.w_mask] = i.head[i.ins_h]),
              (i.head[i.ins_h] = t),
              t++;
          } while (--e);
          (i.strstart = t), (i.lookahead = 2), wt(i);
        }
        return (
          (i.strstart += i.lookahead),
          (i.block_start = i.strstart),
          (i.insert = i.lookahead),
          (i.lookahead = 0),
          (i.match_length = i.prev_length = 2),
          (i.match_available = 0),
          (t.next_in = o),
          (t.input = s),
          (t.avail_in = a),
          (i.wrap = n),
          X
        );
      },
      deflateInfo: "pako deflate (from Nodeca project)",
    };
    const Rt = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
    var Pt = function (t) {
        const e = Array.prototype.slice.call(arguments, 1);
        for (; e.length; ) {
          const r = e.shift();
          if (r) {
            if ("object" != typeof r)
              throw new TypeError(r + "must be non-object");
            for (const e in r) Rt(r, e) && (t[e] = r[e]);
          }
        }
        return t;
      },
      It = (t) => {
        let e = 0;
        for (let r = 0, i = t.length; r < i; r++) e += t[r].length;
        const r = new Uint8Array(e);
        for (let e = 0, i = 0, n = t.length; e < n; e++) {
          let n = t[e];
          r.set(n, i), (i += n.length);
        }
        return r;
      };
    let Nt = !0;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
      Nt = !1;
    }
    const Ut = new Uint8Array(256);
    for (let t = 0; t < 256; t++)
      Ut[t] =
        t >= 252
          ? 6
          : t >= 248
          ? 5
          : t >= 240
          ? 4
          : t >= 224
          ? 3
          : t >= 192
          ? 2
          : 1;
    Ut[254] = Ut[254] = 1;
    var Bt = (t) => {
        let e,
          r,
          i,
          n,
          a,
          o = t.length,
          s = 0;
        for (n = 0; n < o; n++)
          (r = t.charCodeAt(n)),
            55296 == (64512 & r) &&
              n + 1 < o &&
              ((i = t.charCodeAt(n + 1)),
              56320 == (64512 & i) &&
                ((r = 65536 + ((r - 55296) << 10) + (i - 56320)), n++)),
            (s += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
        for (e = new Uint8Array(s), a = 0, n = 0; a < s; n++)
          (r = t.charCodeAt(n)),
            55296 == (64512 & r) &&
              n + 1 < o &&
              ((i = t.charCodeAt(n + 1)),
              56320 == (64512 & i) &&
                ((r = 65536 + ((r - 55296) << 10) + (i - 56320)), n++)),
            r < 128
              ? (e[a++] = r)
              : r < 2048
              ? ((e[a++] = 192 | (r >>> 6)), (e[a++] = 128 | (63 & r)))
              : r < 65536
              ? ((e[a++] = 224 | (r >>> 12)),
                (e[a++] = 128 | ((r >>> 6) & 63)),
                (e[a++] = 128 | (63 & r)))
              : ((e[a++] = 240 | (r >>> 18)),
                (e[a++] = 128 | ((r >>> 12) & 63)),
                (e[a++] = 128 | ((r >>> 6) & 63)),
                (e[a++] = 128 | (63 & r)));
        return e;
      },
      Ot = (t, e) => {
        let r, i;
        const n = e || t.length,
          a = new Array(2 * n);
        for (i = 0, r = 0; r < n; ) {
          let e = t[r++];
          if (e < 128) {
            a[i++] = e;
            continue;
          }
          let o = Ut[e];
          if (o > 4) (a[i++] = 65533), (r += o - 1);
          else {
            for (e &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && r < n; )
              (e = (e << 6) | (63 & t[r++])), o--;
            o > 1
              ? (a[i++] = 65533)
              : e < 65536
              ? (a[i++] = e)
              : ((e -= 65536),
                (a[i++] = 55296 | ((e >> 10) & 1023)),
                (a[i++] = 56320 | (1023 & e)));
          }
        }
        return ((t, e) => {
          if (e < 65534 && t.subarray && Nt)
            return String.fromCharCode.apply(
              null,
              t.length === e ? t : t.subarray(0, e)
            );
          let r = "";
          for (let i = 0; i < e; i++) r += String.fromCharCode(t[i]);
          return r;
        })(a, i);
      },
      Dt = (t, e) => {
        (e = e || t.length) > t.length && (e = t.length);
        let r = e - 1;
        for (; r >= 0 && 128 == (192 & t[r]); ) r--;
        return r < 0 || 0 === r ? e : r + Ut[t[r]] > e ? r : e;
      };
    var Lt = function () {
      (this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ""),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0);
    };
    const Kt = Object.prototype.toString,
      {
        Z_NO_FLUSH: Ct,
        Z_SYNC_FLUSH: jt,
        Z_FULL_FLUSH: qt,
        Z_FINISH: Ft,
        Z_OK: Zt,
        Z_STREAM_END: Vt,
        Z_DEFAULT_COMPRESSION: Yt,
        Z_DEFAULT_STRATEGY: Ht,
        Z_DEFLATED: Wt,
      } = C;
    function Jt(t) {
      this.options = Pt(
        {
          level: Yt,
          method: Wt,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Ht,
        },
        t || {}
      );
      let e = this.options;
      e.raw && e.windowBits > 0
        ? (e.windowBits = -e.windowBits)
        : e.gzip &&
          e.windowBits > 0 &&
          e.windowBits < 16 &&
          (e.windowBits += 16),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new Lt()),
        (this.strm.avail_out = 0);
      let r = Tt.deflateInit2(
        this.strm,
        e.level,
        e.method,
        e.windowBits,
        e.memLevel,
        e.strategy
      );
      if (r !== Zt) throw new Error(K[r]);
      if (
        (e.header && Tt.deflateSetHeader(this.strm, e.header), e.dictionary)
      ) {
        let t;
        if (
          ((t =
            "string" == typeof e.dictionary
              ? Bt(e.dictionary)
              : "[object ArrayBuffer]" === Kt.call(e.dictionary)
              ? new Uint8Array(e.dictionary)
              : e.dictionary),
          (r = Tt.deflateSetDictionary(this.strm, t)),
          r !== Zt)
        )
          throw new Error(K[r]);
        this._dict_set = !0;
      }
    }
    function Gt(t, e) {
      const r = new Jt(e);
      if ((r.push(t, !0), r.err)) throw r.msg || K[r.err];
      return r.result;
    }
    (Jt.prototype.push = function (t, e) {
      const r = this.strm,
        i = this.options.chunkSize;
      let n, a;
      if (this.ended) return !1;
      for (
        a = e === ~~e ? e : !0 === e ? Ft : Ct,
          "string" == typeof t
            ? (r.input = Bt(t))
            : "[object ArrayBuffer]" === Kt.call(t)
            ? (r.input = new Uint8Array(t))
            : (r.input = t),
          r.next_in = 0,
          r.avail_in = r.input.length;
        ;

      )
        if (
          (0 === r.avail_out &&
            ((r.output = new Uint8Array(i)),
            (r.next_out = 0),
            (r.avail_out = i)),
          (a === jt || a === qt) && r.avail_out <= 6)
        )
          this.onData(r.output.subarray(0, r.next_out)), (r.avail_out = 0);
        else {
          if (((n = Tt.deflate(r, a)), n === Vt))
            return (
              r.next_out > 0 && this.onData(r.output.subarray(0, r.next_out)),
              (n = Tt.deflateEnd(this.strm)),
              this.onEnd(n),
              (this.ended = !0),
              n === Zt
            );
          if (0 !== r.avail_out) {
            if (a > 0 && r.next_out > 0)
              this.onData(r.output.subarray(0, r.next_out)), (r.avail_out = 0);
            else if (0 === r.avail_in) break;
          } else this.onData(r.output);
        }
      return !0;
    }),
      (Jt.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (Jt.prototype.onEnd = function (t) {
        t === Zt && (this.result = It(this.chunks)),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var Xt = {
      Deflate: Jt,
      deflate: Gt,
      deflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), Gt(t, e);
      },
      gzip: function (t, e) {
        return ((e = e || {}).gzip = !0), Gt(t, e);
      },
      constants: C,
    };
    var Qt = function (t, e) {
      let r,
        i,
        n,
        a,
        o,
        s,
        f,
        u,
        h,
        c,
        d,
        l,
        p,
        b,
        m,
        y,
        v,
        g,
        w,
        _,
        M,
        A,
        x,
        S;
      const k = t.state;
      (r = t.next_in),
        (x = t.input),
        (i = r + (t.avail_in - 5)),
        (n = t.next_out),
        (S = t.output),
        (a = n - (e - t.avail_out)),
        (o = n + (t.avail_out - 257)),
        (s = k.dmax),
        (f = k.wsize),
        (u = k.whave),
        (h = k.wnext),
        (c = k.window),
        (d = k.hold),
        (l = k.bits),
        (p = k.lencode),
        (b = k.distcode),
        (m = (1 << k.lenbits) - 1),
        (y = (1 << k.distbits) - 1);
      t: do {
        l < 15 && ((d += x[r++] << l), (l += 8), (d += x[r++] << l), (l += 8)),
          (v = p[d & m]);
        e: for (;;) {
          if (
            ((g = v >>> 24),
            (d >>>= g),
            (l -= g),
            (g = (v >>> 16) & 255),
            0 === g)
          )
            S[n++] = 65535 & v;
          else {
            if (!(16 & g)) {
              if (0 == (64 & g)) {
                v = p[(65535 & v) + (d & ((1 << g) - 1))];
                continue e;
              }
              if (32 & g) {
                k.mode = 12;
                break t;
              }
              (t.msg = "invalid literal/length code"), (k.mode = 30);
              break t;
            }
            (w = 65535 & v),
              (g &= 15),
              g &&
                (l < g && ((d += x[r++] << l), (l += 8)),
                (w += d & ((1 << g) - 1)),
                (d >>>= g),
                (l -= g)),
              l < 15 &&
                ((d += x[r++] << l), (l += 8), (d += x[r++] << l), (l += 8)),
              (v = b[d & y]);
            r: for (;;) {
              if (
                ((g = v >>> 24),
                (d >>>= g),
                (l -= g),
                (g = (v >>> 16) & 255),
                !(16 & g))
              ) {
                if (0 == (64 & g)) {
                  v = b[(65535 & v) + (d & ((1 << g) - 1))];
                  continue r;
                }
                (t.msg = "invalid distance code"), (k.mode = 30);
                break t;
              }
              if (
                ((_ = 65535 & v),
                (g &= 15),
                l < g &&
                  ((d += x[r++] << l),
                  (l += 8),
                  l < g && ((d += x[r++] << l), (l += 8))),
                (_ += d & ((1 << g) - 1)),
                _ > s)
              ) {
                (t.msg = "invalid distance too far back"), (k.mode = 30);
                break t;
              }
              if (((d >>>= g), (l -= g), (g = n - a), _ > g)) {
                if (((g = _ - g), g > u && k.sane)) {
                  (t.msg = "invalid distance too far back"), (k.mode = 30);
                  break t;
                }
                if (((M = 0), (A = c), 0 === h)) {
                  if (((M += f - g), g < w)) {
                    w -= g;
                    do {
                      S[n++] = c[M++];
                    } while (--g);
                    (M = n - _), (A = S);
                  }
                } else if (h < g) {
                  if (((M += f + h - g), (g -= h), g < w)) {
                    w -= g;
                    do {
                      S[n++] = c[M++];
                    } while (--g);
                    if (((M = 0), h < w)) {
                      (g = h), (w -= g);
                      do {
                        S[n++] = c[M++];
                      } while (--g);
                      (M = n - _), (A = S);
                    }
                  }
                } else if (((M += h - g), g < w)) {
                  w -= g;
                  do {
                    S[n++] = c[M++];
                  } while (--g);
                  (M = n - _), (A = S);
                }
                for (; w > 2; )
                  (S[n++] = A[M++]),
                    (S[n++] = A[M++]),
                    (S[n++] = A[M++]),
                    (w -= 3);
                w && ((S[n++] = A[M++]), w > 1 && (S[n++] = A[M++]));
              } else {
                M = n - _;
                do {
                  (S[n++] = S[M++]),
                    (S[n++] = S[M++]),
                    (S[n++] = S[M++]),
                    (w -= 3);
                } while (w > 2);
                w && ((S[n++] = S[M++]), w > 1 && (S[n++] = S[M++]));
              }
              break;
            }
          }
          break;
        }
      } while (r < i && n < o);
      (w = l >> 3),
        (r -= w),
        (l -= w << 3),
        (d &= (1 << l) - 1),
        (t.next_in = r),
        (t.next_out = n),
        (t.avail_in = r < i ? i - r + 5 : 5 - (r - i)),
        (t.avail_out = n < o ? o - n + 257 : 257 - (n - o)),
        (k.hold = d),
        (k.bits = l);
    };
    const $t = new Uint16Array([
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
      ]),
      te = new Uint8Array([
        16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19,
        19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
      ]),
      ee = new Uint16Array([
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
        0, 0,
      ]),
      re = new Uint8Array([
        16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23,
        24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
      ]);
    var ie = (t, e, r, i, n, a, o, s) => {
      const f = s.bits;
      let u,
        h,
        c,
        d,
        l,
        p,
        b = 0,
        m = 0,
        y = 0,
        v = 0,
        g = 0,
        w = 0,
        _ = 0,
        M = 0,
        A = 0,
        x = 0,
        S = null,
        k = 0;
      const z = new Uint16Array(16),
        E = new Uint16Array(16);
      let T,
        R,
        P,
        I = null,
        N = 0;
      for (b = 0; b <= 15; b++) z[b] = 0;
      for (m = 0; m < i; m++) z[e[r + m]]++;
      for (g = f, v = 15; v >= 1 && 0 === z[v]; v--);
      if ((g > v && (g = v), 0 === v))
        return (n[a++] = 20971520), (n[a++] = 20971520), (s.bits = 1), 0;
      for (y = 1; y < v && 0 === z[y]; y++);
      for (g < y && (g = y), M = 1, b = 1; b <= 15; b++)
        if (((M <<= 1), (M -= z[b]), M < 0)) return -1;
      if (M > 0 && (0 === t || 1 !== v)) return -1;
      for (E[1] = 0, b = 1; b < 15; b++) E[b + 1] = E[b] + z[b];
      for (m = 0; m < i; m++) 0 !== e[r + m] && (o[E[e[r + m]]++] = m);
      if (
        (0 === t
          ? ((S = I = o), (p = 19))
          : 1 === t
          ? ((S = $t), (k -= 257), (I = te), (N -= 257), (p = 256))
          : ((S = ee), (I = re), (p = -1)),
        (x = 0),
        (m = 0),
        (b = y),
        (l = a),
        (w = g),
        (_ = 0),
        (c = -1),
        (A = 1 << g),
        (d = A - 1),
        (1 === t && A > 852) || (2 === t && A > 592))
      )
        return 1;
      for (;;) {
        (T = b - _),
          o[m] < p
            ? ((R = 0), (P = o[m]))
            : o[m] > p
            ? ((R = I[N + o[m]]), (P = S[k + o[m]]))
            : ((R = 96), (P = 0)),
          (u = 1 << (b - _)),
          (h = 1 << w),
          (y = h);
        do {
          (h -= u), (n[l + (x >> _) + h] = (T << 24) | (R << 16) | P | 0);
        } while (0 !== h);
        for (u = 1 << (b - 1); x & u; ) u >>= 1;
        if ((0 !== u ? ((x &= u - 1), (x += u)) : (x = 0), m++, 0 == --z[b])) {
          if (b === v) break;
          b = e[r + o[m]];
        }
        if (b > g && (x & d) !== c) {
          for (
            0 === _ && (_ = g), l += y, w = b - _, M = 1 << w;
            w + _ < v && ((M -= z[w + _]), !(M <= 0));

          )
            w++, (M <<= 1);
          if (((A += 1 << w), (1 === t && A > 852) || (2 === t && A > 592)))
            return 1;
          (c = x & d), (n[c] = (g << 24) | (w << 16) | (l - a) | 0);
        }
      }
      return (
        0 !== x && (n[l + x] = ((b - _) << 24) | (64 << 16) | 0),
        (s.bits = g),
        0
      );
    };
    const {
        Z_FINISH: ne,
        Z_BLOCK: ae,
        Z_TREES: oe,
        Z_OK: se,
        Z_STREAM_END: fe,
        Z_NEED_DICT: ue,
        Z_STREAM_ERROR: he,
        Z_DATA_ERROR: ce,
        Z_MEM_ERROR: de,
        Z_BUF_ERROR: le,
        Z_DEFLATED: pe,
      } = C,
      be = (t) =>
        ((t >>> 24) & 255) +
        ((t >>> 8) & 65280) +
        ((65280 & t) << 8) +
        ((255 & t) << 24);
    function me() {
      (this.mode = 0),
        (this.last = !1),
        (this.wrap = 0),
        (this.havedict = !1),
        (this.flags = 0),
        (this.dmax = 0),
        (this.check = 0),
        (this.total = 0),
        (this.head = null),
        (this.wbits = 0),
        (this.wsize = 0),
        (this.whave = 0),
        (this.wnext = 0),
        (this.window = null),
        (this.hold = 0),
        (this.bits = 0),
        (this.length = 0),
        (this.offset = 0),
        (this.extra = 0),
        (this.lencode = null),
        (this.distcode = null),
        (this.lenbits = 0),
        (this.distbits = 0),
        (this.ncode = 0),
        (this.nlen = 0),
        (this.ndist = 0),
        (this.have = 0),
        (this.next = null),
        (this.lens = new Uint16Array(320)),
        (this.work = new Uint16Array(288)),
        (this.lendyn = null),
        (this.distdyn = null),
        (this.sane = 0),
        (this.back = 0),
        (this.was = 0);
    }
    const ye = (t) => {
        if (!t || !t.state) return he;
        const e = t.state;
        return (
          (t.total_in = t.total_out = e.total = 0),
          (t.msg = ""),
          e.wrap && (t.adler = 1 & e.wrap),
          (e.mode = 1),
          (e.last = 0),
          (e.havedict = 0),
          (e.dmax = 32768),
          (e.head = null),
          (e.hold = 0),
          (e.bits = 0),
          (e.lencode = e.lendyn = new Int32Array(852)),
          (e.distcode = e.distdyn = new Int32Array(592)),
          (e.sane = 1),
          (e.back = -1),
          se
        );
      },
      ve = (t) => {
        if (!t || !t.state) return he;
        const e = t.state;
        return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), ye(t);
      },
      ge = (t, e) => {
        let r;
        if (!t || !t.state) return he;
        const i = t.state;
        return (
          e < 0
            ? ((r = 0), (e = -e))
            : ((r = 1 + (e >> 4)), e < 48 && (e &= 15)),
          e && (e < 8 || e > 15)
            ? he
            : (null !== i.window && i.wbits !== e && (i.window = null),
              (i.wrap = r),
              (i.wbits = e),
              ve(t))
        );
      },
      we = (t, e) => {
        if (!t) return he;
        const r = new me();
        (t.state = r), (r.window = null);
        const i = ge(t, e);
        return i !== se && (t.state = null), i;
      };
    let _e,
      Me,
      Ae = !0;
    const xe = (t) => {
        if (Ae) {
          (_e = new Int32Array(512)), (Me = new Int32Array(32));
          let e = 0;
          for (; e < 144; ) t.lens[e++] = 8;
          for (; e < 256; ) t.lens[e++] = 9;
          for (; e < 280; ) t.lens[e++] = 7;
          for (; e < 288; ) t.lens[e++] = 8;
          for (
            ie(1, t.lens, 0, 288, _e, 0, t.work, { bits: 9 }), e = 0;
            e < 32;

          )
            t.lens[e++] = 5;
          ie(2, t.lens, 0, 32, Me, 0, t.work, { bits: 5 }), (Ae = !1);
        }
        (t.lencode = _e), (t.lenbits = 9), (t.distcode = Me), (t.distbits = 5);
      },
      Se = (t, e, r, i) => {
        let n;
        const a = t.state;
        return (
          null === a.window &&
            ((a.wsize = 1 << a.wbits),
            (a.wnext = 0),
            (a.whave = 0),
            (a.window = new Uint8Array(a.wsize))),
          i >= a.wsize
            ? (a.window.set(e.subarray(r - a.wsize, r), 0),
              (a.wnext = 0),
              (a.whave = a.wsize))
            : ((n = a.wsize - a.wnext),
              n > i && (n = i),
              a.window.set(e.subarray(r - i, r - i + n), a.wnext),
              (i -= n)
                ? (a.window.set(e.subarray(r - i, r), 0),
                  (a.wnext = i),
                  (a.whave = a.wsize))
                : ((a.wnext += n),
                  a.wnext === a.wsize && (a.wnext = 0),
                  a.whave < a.wsize && (a.whave += n))),
          0
        );
      };
    var ke = {
      inflateReset: ve,
      inflateReset2: ge,
      inflateResetKeep: ye,
      inflateInit: (t) => we(t, 15),
      inflateInit2: we,
      inflate: (t, e) => {
        let r,
          i,
          n,
          a,
          o,
          s,
          f,
          u,
          h,
          c,
          d,
          l,
          p,
          b,
          m,
          y,
          v,
          g,
          w,
          _,
          M,
          A,
          x = 0;
        const S = new Uint8Array(4);
        let k, z;
        const E = new Uint8Array([
          16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]);
        if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in))
          return he;
        (r = t.state),
          12 === r.mode && (r.mode = 13),
          (o = t.next_out),
          (n = t.output),
          (f = t.avail_out),
          (a = t.next_in),
          (i = t.input),
          (s = t.avail_in),
          (u = r.hold),
          (h = r.bits),
          (c = s),
          (d = f),
          (A = se);
        t: for (;;)
          switch (r.mode) {
            case 1:
              if (0 === r.wrap) {
                r.mode = 13;
                break;
              }
              for (; h < 16; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if (2 & r.wrap && 35615 === u) {
                (r.check = 0),
                  (S[0] = 255 & u),
                  (S[1] = (u >>> 8) & 255),
                  (r.check = L(r.check, S, 2, 0)),
                  (u = 0),
                  (h = 0),
                  (r.mode = 2);
                break;
              }
              if (
                ((r.flags = 0),
                r.head && (r.head.done = !1),
                !(1 & r.wrap) || (((255 & u) << 8) + (u >> 8)) % 31)
              ) {
                (t.msg = "incorrect header check"), (r.mode = 30);
                break;
              }
              if ((15 & u) !== pe) {
                (t.msg = "unknown compression method"), (r.mode = 30);
                break;
              }
              if (((u >>>= 4), (h -= 4), (M = 8 + (15 & u)), 0 === r.wbits))
                r.wbits = M;
              else if (M > r.wbits) {
                (t.msg = "invalid window size"), (r.mode = 30);
                break;
              }
              (r.dmax = 1 << r.wbits),
                (t.adler = r.check = 1),
                (r.mode = 512 & u ? 10 : 12),
                (u = 0),
                (h = 0);
              break;
            case 2:
              for (; h < 16; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if (((r.flags = u), (255 & r.flags) !== pe)) {
                (t.msg = "unknown compression method"), (r.mode = 30);
                break;
              }
              if (57344 & r.flags) {
                (t.msg = "unknown header flags set"), (r.mode = 30);
                break;
              }
              r.head && (r.head.text = (u >> 8) & 1),
                512 & r.flags &&
                  ((S[0] = 255 & u),
                  (S[1] = (u >>> 8) & 255),
                  (r.check = L(r.check, S, 2, 0))),
                (u = 0),
                (h = 0),
                (r.mode = 3);
            case 3:
              for (; h < 32; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              r.head && (r.head.time = u),
                512 & r.flags &&
                  ((S[0] = 255 & u),
                  (S[1] = (u >>> 8) & 255),
                  (S[2] = (u >>> 16) & 255),
                  (S[3] = (u >>> 24) & 255),
                  (r.check = L(r.check, S, 4, 0))),
                (u = 0),
                (h = 0),
                (r.mode = 4);
            case 4:
              for (; h < 16; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              r.head && ((r.head.xflags = 255 & u), (r.head.os = u >> 8)),
                512 & r.flags &&
                  ((S[0] = 255 & u),
                  (S[1] = (u >>> 8) & 255),
                  (r.check = L(r.check, S, 2, 0))),
                (u = 0),
                (h = 0),
                (r.mode = 5);
            case 5:
              if (1024 & r.flags) {
                for (; h < 16; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (r.length = u),
                  r.head && (r.head.extra_len = u),
                  512 & r.flags &&
                    ((S[0] = 255 & u),
                    (S[1] = (u >>> 8) & 255),
                    (r.check = L(r.check, S, 2, 0))),
                  (u = 0),
                  (h = 0);
              } else r.head && (r.head.extra = null);
              r.mode = 6;
            case 6:
              if (
                1024 & r.flags &&
                ((l = r.length),
                l > s && (l = s),
                l &&
                  (r.head &&
                    ((M = r.head.extra_len - r.length),
                    r.head.extra ||
                      (r.head.extra = new Uint8Array(r.head.extra_len)),
                    r.head.extra.set(i.subarray(a, a + l), M)),
                  512 & r.flags && (r.check = L(r.check, i, l, a)),
                  (s -= l),
                  (a += l),
                  (r.length -= l)),
                r.length)
              )
                break t;
              (r.length = 0), (r.mode = 7);
            case 7:
              if (2048 & r.flags) {
                if (0 === s) break t;
                l = 0;
                do {
                  (M = i[a + l++]),
                    r.head &&
                      M &&
                      r.length < 65536 &&
                      (r.head.name += String.fromCharCode(M));
                } while (M && l < s);
                if (
                  (512 & r.flags && (r.check = L(r.check, i, l, a)),
                  (s -= l),
                  (a += l),
                  M)
                )
                  break t;
              } else r.head && (r.head.name = null);
              (r.length = 0), (r.mode = 8);
            case 8:
              if (4096 & r.flags) {
                if (0 === s) break t;
                l = 0;
                do {
                  (M = i[a + l++]),
                    r.head &&
                      M &&
                      r.length < 65536 &&
                      (r.head.comment += String.fromCharCode(M));
                } while (M && l < s);
                if (
                  (512 & r.flags && (r.check = L(r.check, i, l, a)),
                  (s -= l),
                  (a += l),
                  M)
                )
                  break t;
              } else r.head && (r.head.comment = null);
              r.mode = 9;
            case 9:
              if (512 & r.flags) {
                for (; h < 16; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                if (u !== (65535 & r.check)) {
                  (t.msg = "header crc mismatch"), (r.mode = 30);
                  break;
                }
                (u = 0), (h = 0);
              }
              r.head &&
                ((r.head.hcrc = (r.flags >> 9) & 1), (r.head.done = !0)),
                (t.adler = r.check = 0),
                (r.mode = 12);
              break;
            case 10:
              for (; h < 32; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              (t.adler = r.check = be(u)), (u = 0), (h = 0), (r.mode = 11);
            case 11:
              if (0 === r.havedict)
                return (
                  (t.next_out = o),
                  (t.avail_out = f),
                  (t.next_in = a),
                  (t.avail_in = s),
                  (r.hold = u),
                  (r.bits = h),
                  ue
                );
              (t.adler = r.check = 1), (r.mode = 12);
            case 12:
              if (e === ae || e === oe) break t;
            case 13:
              if (r.last) {
                (u >>>= 7 & h), (h -= 7 & h), (r.mode = 27);
                break;
              }
              for (; h < 3; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              switch (((r.last = 1 & u), (u >>>= 1), (h -= 1), 3 & u)) {
                case 0:
                  r.mode = 14;
                  break;
                case 1:
                  if ((xe(r), (r.mode = 20), e === oe)) {
                    (u >>>= 2), (h -= 2);
                    break t;
                  }
                  break;
                case 2:
                  r.mode = 17;
                  break;
                case 3:
                  (t.msg = "invalid block type"), (r.mode = 30);
              }
              (u >>>= 2), (h -= 2);
              break;
            case 14:
              for (u >>>= 7 & h, h -= 7 & h; h < 32; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if ((65535 & u) != ((u >>> 16) ^ 65535)) {
                (t.msg = "invalid stored block lengths"), (r.mode = 30);
                break;
              }
              if (
                ((r.length = 65535 & u),
                (u = 0),
                (h = 0),
                (r.mode = 15),
                e === oe)
              )
                break t;
            case 15:
              r.mode = 16;
            case 16:
              if (((l = r.length), l)) {
                if ((l > s && (l = s), l > f && (l = f), 0 === l)) break t;
                n.set(i.subarray(a, a + l), o),
                  (s -= l),
                  (a += l),
                  (f -= l),
                  (o += l),
                  (r.length -= l);
                break;
              }
              r.mode = 12;
              break;
            case 17:
              for (; h < 14; ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if (
                ((r.nlen = 257 + (31 & u)),
                (u >>>= 5),
                (h -= 5),
                (r.ndist = 1 + (31 & u)),
                (u >>>= 5),
                (h -= 5),
                (r.ncode = 4 + (15 & u)),
                (u >>>= 4),
                (h -= 4),
                r.nlen > 286 || r.ndist > 30)
              ) {
                (t.msg = "too many length or distance symbols"), (r.mode = 30);
                break;
              }
              (r.have = 0), (r.mode = 18);
            case 18:
              for (; r.have < r.ncode; ) {
                for (; h < 3; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (r.lens[E[r.have++]] = 7 & u), (u >>>= 3), (h -= 3);
              }
              for (; r.have < 19; ) r.lens[E[r.have++]] = 0;
              if (
                ((r.lencode = r.lendyn),
                (r.lenbits = 7),
                (k = { bits: r.lenbits }),
                (A = ie(0, r.lens, 0, 19, r.lencode, 0, r.work, k)),
                (r.lenbits = k.bits),
                A)
              ) {
                (t.msg = "invalid code lengths set"), (r.mode = 30);
                break;
              }
              (r.have = 0), (r.mode = 19);
            case 19:
              for (; r.have < r.nlen + r.ndist; ) {
                for (
                  ;
                  (x = r.lencode[u & ((1 << r.lenbits) - 1)]),
                    (m = x >>> 24),
                    (y = (x >>> 16) & 255),
                    (v = 65535 & x),
                    !(m <= h);

                ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                if (v < 16) (u >>>= m), (h -= m), (r.lens[r.have++] = v);
                else {
                  if (16 === v) {
                    for (z = m + 2; h < z; ) {
                      if (0 === s) break t;
                      s--, (u += i[a++] << h), (h += 8);
                    }
                    if (((u >>>= m), (h -= m), 0 === r.have)) {
                      (t.msg = "invalid bit length repeat"), (r.mode = 30);
                      break;
                    }
                    (M = r.lens[r.have - 1]),
                      (l = 3 + (3 & u)),
                      (u >>>= 2),
                      (h -= 2);
                  } else if (17 === v) {
                    for (z = m + 3; h < z; ) {
                      if (0 === s) break t;
                      s--, (u += i[a++] << h), (h += 8);
                    }
                    (u >>>= m),
                      (h -= m),
                      (M = 0),
                      (l = 3 + (7 & u)),
                      (u >>>= 3),
                      (h -= 3);
                  } else {
                    for (z = m + 7; h < z; ) {
                      if (0 === s) break t;
                      s--, (u += i[a++] << h), (h += 8);
                    }
                    (u >>>= m),
                      (h -= m),
                      (M = 0),
                      (l = 11 + (127 & u)),
                      (u >>>= 7),
                      (h -= 7);
                  }
                  if (r.have + l > r.nlen + r.ndist) {
                    (t.msg = "invalid bit length repeat"), (r.mode = 30);
                    break;
                  }
                  for (; l--; ) r.lens[r.have++] = M;
                }
              }
              if (30 === r.mode) break;
              if (0 === r.lens[256]) {
                (t.msg = "invalid code -- missing end-of-block"), (r.mode = 30);
                break;
              }
              if (
                ((r.lenbits = 9),
                (k = { bits: r.lenbits }),
                (A = ie(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, k)),
                (r.lenbits = k.bits),
                A)
              ) {
                (t.msg = "invalid literal/lengths set"), (r.mode = 30);
                break;
              }
              if (
                ((r.distbits = 6),
                (r.distcode = r.distdyn),
                (k = { bits: r.distbits }),
                (A = ie(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, k)),
                (r.distbits = k.bits),
                A)
              ) {
                (t.msg = "invalid distances set"), (r.mode = 30);
                break;
              }
              if (((r.mode = 20), e === oe)) break t;
            case 20:
              r.mode = 21;
            case 21:
              if (s >= 6 && f >= 258) {
                (t.next_out = o),
                  (t.avail_out = f),
                  (t.next_in = a),
                  (t.avail_in = s),
                  (r.hold = u),
                  (r.bits = h),
                  Qt(t, d),
                  (o = t.next_out),
                  (n = t.output),
                  (f = t.avail_out),
                  (a = t.next_in),
                  (i = t.input),
                  (s = t.avail_in),
                  (u = r.hold),
                  (h = r.bits),
                  12 === r.mode && (r.back = -1);
                break;
              }
              for (
                r.back = 0;
                (x = r.lencode[u & ((1 << r.lenbits) - 1)]),
                  (m = x >>> 24),
                  (y = (x >>> 16) & 255),
                  (v = 65535 & x),
                  !(m <= h);

              ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if (y && 0 == (240 & y)) {
                for (
                  g = m, w = y, _ = v;
                  (x = r.lencode[_ + ((u & ((1 << (g + w)) - 1)) >> g)]),
                    (m = x >>> 24),
                    (y = (x >>> 16) & 255),
                    (v = 65535 & x),
                    !(g + m <= h);

                ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (u >>>= g), (h -= g), (r.back += g);
              }
              if (
                ((u >>>= m), (h -= m), (r.back += m), (r.length = v), 0 === y)
              ) {
                r.mode = 26;
                break;
              }
              if (32 & y) {
                (r.back = -1), (r.mode = 12);
                break;
              }
              if (64 & y) {
                (t.msg = "invalid literal/length code"), (r.mode = 30);
                break;
              }
              (r.extra = 15 & y), (r.mode = 22);
            case 22:
              if (r.extra) {
                for (z = r.extra; h < z; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (r.length += u & ((1 << r.extra) - 1)),
                  (u >>>= r.extra),
                  (h -= r.extra),
                  (r.back += r.extra);
              }
              (r.was = r.length), (r.mode = 23);
            case 23:
              for (
                ;
                (x = r.distcode[u & ((1 << r.distbits) - 1)]),
                  (m = x >>> 24),
                  (y = (x >>> 16) & 255),
                  (v = 65535 & x),
                  !(m <= h);

              ) {
                if (0 === s) break t;
                s--, (u += i[a++] << h), (h += 8);
              }
              if (0 == (240 & y)) {
                for (
                  g = m, w = y, _ = v;
                  (x = r.distcode[_ + ((u & ((1 << (g + w)) - 1)) >> g)]),
                    (m = x >>> 24),
                    (y = (x >>> 16) & 255),
                    (v = 65535 & x),
                    !(g + m <= h);

                ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (u >>>= g), (h -= g), (r.back += g);
              }
              if (((u >>>= m), (h -= m), (r.back += m), 64 & y)) {
                (t.msg = "invalid distance code"), (r.mode = 30);
                break;
              }
              (r.offset = v), (r.extra = 15 & y), (r.mode = 24);
            case 24:
              if (r.extra) {
                for (z = r.extra; h < z; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                (r.offset += u & ((1 << r.extra) - 1)),
                  (u >>>= r.extra),
                  (h -= r.extra),
                  (r.back += r.extra);
              }
              if (r.offset > r.dmax) {
                (t.msg = "invalid distance too far back"), (r.mode = 30);
                break;
              }
              r.mode = 25;
            case 25:
              if (0 === f) break t;
              if (((l = d - f), r.offset > l)) {
                if (((l = r.offset - l), l > r.whave && r.sane)) {
                  (t.msg = "invalid distance too far back"), (r.mode = 30);
                  break;
                }
                l > r.wnext
                  ? ((l -= r.wnext), (p = r.wsize - l))
                  : (p = r.wnext - l),
                  l > r.length && (l = r.length),
                  (b = r.window);
              } else (b = n), (p = o - r.offset), (l = r.length);
              l > f && (l = f), (f -= l), (r.length -= l);
              do {
                n[o++] = b[p++];
              } while (--l);
              0 === r.length && (r.mode = 21);
              break;
            case 26:
              if (0 === f) break t;
              (n[o++] = r.length), f--, (r.mode = 21);
              break;
            case 27:
              if (r.wrap) {
                for (; h < 32; ) {
                  if (0 === s) break t;
                  s--, (u |= i[a++] << h), (h += 8);
                }
                if (
                  ((d -= f),
                  (t.total_out += d),
                  (r.total += d),
                  d &&
                    (t.adler = r.check =
                      r.flags
                        ? L(r.check, n, d, o - d)
                        : O(r.check, n, d, o - d)),
                  (d = f),
                  (r.flags ? u : be(u)) !== r.check)
                ) {
                  (t.msg = "incorrect data check"), (r.mode = 30);
                  break;
                }
                (u = 0), (h = 0);
              }
              r.mode = 28;
            case 28:
              if (r.wrap && r.flags) {
                for (; h < 32; ) {
                  if (0 === s) break t;
                  s--, (u += i[a++] << h), (h += 8);
                }
                if (u !== (4294967295 & r.total)) {
                  (t.msg = "incorrect length check"), (r.mode = 30);
                  break;
                }
                (u = 0), (h = 0);
              }
              r.mode = 29;
            case 29:
              A = fe;
              break t;
            case 30:
              A = ce;
              break t;
            case 31:
              return de;
            case 32:
            default:
              return he;
          }
        return (
          (t.next_out = o),
          (t.avail_out = f),
          (t.next_in = a),
          (t.avail_in = s),
          (r.hold = u),
          (r.bits = h),
          (r.wsize ||
            (d !== t.avail_out && r.mode < 30 && (r.mode < 27 || e !== ne))) &&
            Se(t, t.output, t.next_out, d - t.avail_out),
          (c -= t.avail_in),
          (d -= t.avail_out),
          (t.total_in += c),
          (t.total_out += d),
          (r.total += d),
          r.wrap &&
            d &&
            (t.adler = r.check =
              r.flags
                ? L(r.check, n, d, t.next_out - d)
                : O(r.check, n, d, t.next_out - d)),
          (t.data_type =
            r.bits +
            (r.last ? 64 : 0) +
            (12 === r.mode ? 128 : 0) +
            (20 === r.mode || 15 === r.mode ? 256 : 0)),
          ((0 === c && 0 === d) || e === ne) && A === se && (A = le),
          A
        );
      },
      inflateEnd: (t) => {
        if (!t || !t.state) return he;
        let e = t.state;
        return e.window && (e.window = null), (t.state = null), se;
      },
      inflateGetHeader: (t, e) => {
        if (!t || !t.state) return he;
        const r = t.state;
        return 0 == (2 & r.wrap) ? he : ((r.head = e), (e.done = !1), se);
      },
      inflateSetDictionary: (t, e) => {
        const r = e.length;
        let i, n, a;
        return t && t.state
          ? ((i = t.state),
            0 !== i.wrap && 11 !== i.mode
              ? he
              : 11 === i.mode && ((n = 1), (n = O(n, e, r, 0)), n !== i.check)
              ? ce
              : ((a = Se(t, e, r, r)),
                a ? ((i.mode = 31), de) : ((i.havedict = 1), se)))
          : he;
      },
      inflateInfo: "pako inflate (from Nodeca project)",
    };
    var ze = function () {
      (this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ""),
        (this.comment = ""),
        (this.hcrc = 0),
        (this.done = !1);
    };
    const Ee = Object.prototype.toString,
      {
        Z_NO_FLUSH: Te,
        Z_FINISH: Re,
        Z_OK: Pe,
        Z_STREAM_END: Ie,
        Z_NEED_DICT: Ne,
        Z_STREAM_ERROR: Ue,
        Z_DATA_ERROR: Be,
        Z_MEM_ERROR: Oe,
      } = C;
    function De(t) {
      this.options = Pt({ chunkSize: 65536, windowBits: 15, to: "" }, t || {});
      const e = this.options;
      e.raw &&
        e.windowBits >= 0 &&
        e.windowBits < 16 &&
        ((e.windowBits = -e.windowBits),
        0 === e.windowBits && (e.windowBits = -15)),
        !(e.windowBits >= 0 && e.windowBits < 16) ||
          (t && t.windowBits) ||
          (e.windowBits += 32),
        e.windowBits > 15 &&
          e.windowBits < 48 &&
          0 == (15 & e.windowBits) &&
          (e.windowBits |= 15),
        (this.err = 0),
        (this.msg = ""),
        (this.ended = !1),
        (this.chunks = []),
        (this.strm = new Lt()),
        (this.strm.avail_out = 0);
      let r = ke.inflateInit2(this.strm, e.windowBits);
      if (r !== Pe) throw new Error(K[r]);
      if (
        ((this.header = new ze()),
        ke.inflateGetHeader(this.strm, this.header),
        e.dictionary &&
          ("string" == typeof e.dictionary
            ? (e.dictionary = Bt(e.dictionary))
            : "[object ArrayBuffer]" === Ee.call(e.dictionary) &&
              (e.dictionary = new Uint8Array(e.dictionary)),
          e.raw &&
            ((r = ke.inflateSetDictionary(this.strm, e.dictionary)), r !== Pe)))
      )
        throw new Error(K[r]);
    }
    function Le(t, e) {
      const r = new De(e);
      if ((r.push(t), r.err)) throw r.msg || K[r.err];
      return r.result;
    }
    (De.prototype.push = function (t, e) {
      const r = this.strm,
        i = this.options.chunkSize,
        n = this.options.dictionary;
      let a, o, s;
      if (this.ended) return !1;
      for (
        o = e === ~~e ? e : !0 === e ? Re : Te,
          "[object ArrayBuffer]" === Ee.call(t)
            ? (r.input = new Uint8Array(t))
            : (r.input = t),
          r.next_in = 0,
          r.avail_in = r.input.length;
        ;

      ) {
        for (
          0 === r.avail_out &&
            ((r.output = new Uint8Array(i)),
            (r.next_out = 0),
            (r.avail_out = i)),
            a = ke.inflate(r, o),
            a === Ne &&
              n &&
              ((a = ke.inflateSetDictionary(r, n)),
              a === Pe ? (a = ke.inflate(r, o)) : a === Be && (a = Ne));
          r.avail_in > 0 && a === Ie && r.state.wrap > 0 && 0 !== t[r.next_in];

        )
          ke.inflateReset(r), (a = ke.inflate(r, o));
        switch (a) {
          case Ue:
          case Be:
          case Ne:
          case Oe:
            return this.onEnd(a), (this.ended = !0), !1;
        }
        if (((s = r.avail_out), r.next_out && (0 === r.avail_out || a === Ie)))
          if ("string" === this.options.to) {
            let t = Dt(r.output, r.next_out),
              e = r.next_out - t,
              n = Ot(r.output, t);
            (r.next_out = e),
              (r.avail_out = i - e),
              e && r.output.set(r.output.subarray(t, t + e), 0),
              this.onData(n);
          } else
            this.onData(
              r.output.length === r.next_out
                ? r.output
                : r.output.subarray(0, r.next_out)
            );
        if (a !== Pe || 0 !== s) {
          if (a === Ie)
            return (
              (a = ke.inflateEnd(this.strm)),
              this.onEnd(a),
              (this.ended = !0),
              !0
            );
          if (0 === r.avail_in) break;
        }
      }
      return !0;
    }),
      (De.prototype.onData = function (t) {
        this.chunks.push(t);
      }),
      (De.prototype.onEnd = function (t) {
        t === Pe &&
          ("string" === this.options.to
            ? (this.result = this.chunks.join(""))
            : (this.result = It(this.chunks))),
          (this.chunks = []),
          (this.err = t),
          (this.msg = this.strm.msg);
      });
    var Ke = {
      Inflate: De,
      inflate: Le,
      inflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), Le(t, e);
      },
      ungzip: Le,
      constants: C,
    };
    const { Deflate: Ce, deflate: je, deflateRaw: qe, gzip: Fe } = Xt,
      { Inflate: Ze, inflate: Ve, inflateRaw: Ye, ungzip: He } = Ke;
    var We = Ce,
      Je = je,
      Ge = qe,
      Xe = Fe,
      Qe = Ze,
      $e = Ve,
      tr = Ye,
      er = He,
      rr = C,
      ir = {
        Deflate: We,
        deflate: Je,
        deflateRaw: Ge,
        gzip: Xe,
        Inflate: Qe,
        inflate: $e,
        inflateRaw: tr,
        ungzip: er,
        constants: rr,
      };
    e.default = ir;
  },
  function (t, e, r) {
    "use strict";
    (e.sha1 = r(30)),
      (e.sha224 = r(31)),
      (e.sha256 = r(14)),
      (e.sha384 = r(32)),
      (e.sha512 = r(15));
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(7),
      a = r(13),
      o = i.rotl32,
      s = i.sum32,
      f = i.sum32_5,
      u = a.ft_1,
      h = n.BlockHash,
      c = [1518500249, 1859775393, 2400959708, 3395469782];
    function d() {
      if (!(this instanceof d)) return new d();
      h.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.W = new Array(80));
    }
    i.inherits(d, h),
      (t.exports = d),
      (d.blockSize = 512),
      (d.outSize = 160),
      (d.hmacStrength = 80),
      (d.padLength = 64),
      (d.prototype._update = function (t, e) {
        for (var r = this.W, i = 0; i < 16; i++) r[i] = t[e + i];
        for (; i < r.length; i++)
          r[i] = o(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
        var n = this.h[0],
          a = this.h[1],
          h = this.h[2],
          d = this.h[3],
          l = this.h[4];
        for (i = 0; i < r.length; i++) {
          var p = ~~(i / 20),
            b = f(o(n, 5), u(p, a, h, d), l, r[i], c[p]);
          (l = d), (d = h), (h = o(a, 30)), (a = n), (n = b);
        }
        (this.h[0] = s(this.h[0], n)),
          (this.h[1] = s(this.h[1], a)),
          (this.h[2] = s(this.h[2], h)),
          (this.h[3] = s(this.h[3], d)),
          (this.h[4] = s(this.h[4], l));
      }),
      (d.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h, "big")
          : i.split32(this.h, "big");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(14);
    function a() {
      if (!(this instanceof a)) return new a();
      n.call(this),
        (this.h = [
          3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025,
          1694076839, 3204075428,
        ]);
    }
    i.inherits(a, n),
      (t.exports = a),
      (a.blockSize = 512),
      (a.outSize = 224),
      (a.hmacStrength = 192),
      (a.padLength = 64),
      (a.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h.slice(0, 7), "big")
          : i.split32(this.h.slice(0, 7), "big");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(15);
    function a() {
      if (!(this instanceof a)) return new a();
      n.call(this),
        (this.h = [
          3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
          355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
          3675008525, 1694076839, 1203062813, 3204075428,
        ]);
    }
    i.inherits(a, n),
      (t.exports = a),
      (a.blockSize = 1024),
      (a.outSize = 384),
      (a.hmacStrength = 192),
      (a.padLength = 128),
      (a.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h.slice(0, 12), "big")
          : i.split32(this.h.slice(0, 12), "big");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(7),
      a = i.rotl32,
      o = i.sum32,
      s = i.sum32_3,
      f = i.sum32_4,
      u = n.BlockHash;
    function h() {
      if (!(this instanceof h)) return new h();
      u.call(this),
        (this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520]),
        (this.endian = "little");
    }
    function c(t, e, r, i) {
      return t <= 15
        ? e ^ r ^ i
        : t <= 31
        ? (e & r) | (~e & i)
        : t <= 47
        ? (e | ~r) ^ i
        : t <= 63
        ? (e & i) | (r & ~i)
        : e ^ (r | ~i);
    }
    function d(t) {
      return t <= 15
        ? 0
        : t <= 31
        ? 1518500249
        : t <= 47
        ? 1859775393
        : t <= 63
        ? 2400959708
        : 2840853838;
    }
    function l(t) {
      return t <= 15
        ? 1352829926
        : t <= 31
        ? 1548603684
        : t <= 47
        ? 1836072691
        : t <= 63
        ? 2053994217
        : 0;
    }
    i.inherits(h, u),
      (e.ripemd160 = h),
      (h.blockSize = 512),
      (h.outSize = 160),
      (h.hmacStrength = 192),
      (h.padLength = 64),
      (h.prototype._update = function (t, e) {
        for (
          var r = this.h[0],
            i = this.h[1],
            n = this.h[2],
            u = this.h[3],
            h = this.h[4],
            v = r,
            g = i,
            w = n,
            _ = u,
            M = h,
            A = 0;
          A < 80;
          A++
        ) {
          var x = o(a(f(r, c(A, i, n, u), t[p[A] + e], d(A)), m[A]), h);
          (r = h),
            (h = u),
            (u = a(n, 10)),
            (n = i),
            (i = x),
            (x = o(a(f(v, c(79 - A, g, w, _), t[b[A] + e], l(A)), y[A]), M)),
            (v = M),
            (M = _),
            (_ = a(w, 10)),
            (w = g),
            (g = x);
        }
        (x = s(this.h[1], n, _)),
          (this.h[1] = s(this.h[2], u, M)),
          (this.h[2] = s(this.h[3], h, v)),
          (this.h[3] = s(this.h[4], r, g)),
          (this.h[4] = s(this.h[0], i, w)),
          (this.h[0] = x);
      }),
      (h.prototype._digest = function (t) {
        return "hex" === t
          ? i.toHex32(this.h, "little")
          : i.split32(this.h, "little");
      });
    var p = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
        6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0,
        6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
        4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
      ],
      b = [
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
        13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
        12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
        14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
      ],
      m = [
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11,
        9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14,
        8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6,
        5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
      ],
      y = [
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
        12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12,
        13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12,
        5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
      ];
  },
  function (t, e, r) {
    "use strict";
    var i = r(1),
      n = r(4);
    function a(t, e, r) {
      if (!(this instanceof a)) return new a(t, e, r);
      (this.Hash = t),
        (this.blockSize = t.blockSize / 8),
        (this.outSize = t.outSize / 8),
        (this.inner = null),
        (this.outer = null),
        this._init(i.toArray(e, r));
    }
    (t.exports = a),
      (a.prototype._init = function (t) {
        t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
          n(t.length <= this.blockSize);
        for (var e = t.length; e < this.blockSize; e++) t.push(0);
        for (e = 0; e < t.length; e++) t[e] ^= 54;
        for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
          t[e] ^= 106;
        this.outer = new this.Hash().update(t);
      }),
      (a.prototype.update = function (t, e) {
        return this.inner.update(t, e), this;
      }),
      (a.prototype.digest = function (t) {
        return this.outer.update(this.inner.digest()), this.outer.digest(t);
      });
  },
  function (t, e, r) {
    "use strict";
    var i = function (t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t))
          return (function (t, e) {
            var r = [],
              i = !0,
              n = !1,
              a = void 0;
            try {
              for (
                var o, s = t[Symbol.iterator]();
                !(i = (o = s.next()).done) &&
                (r.push(o.value), !e || r.length !== e);
                i = !0
              );
            } catch (t) {
              (n = !0), (a = t);
            } finally {
              try {
                !i && s.return && s.return();
              } finally {
                if (n) throw a;
              }
            }
            return r;
          })(t, e);
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance"
        );
      },
      n = (function () {
        function t(t, e) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function (e, r, i) {
          return r && t(e.prototype, r), i && t(e, i), e;
        };
      })();
    var a = (function () {
      function t() {
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t);
      }
      return (
        n(t, null, [
          {
            key: "get_n_pad_bytes",
            value: function (t) {
              return 64 - ((t + 8) & 63);
            },
          },
          {
            key: "pad",
            value: function (e) {
              var r,
                n,
                a = e.byteLength,
                o = t.get_n_pad_bytes(a),
                s = ((r = a), (n = 536870912), [Math.floor(r / n), r % n]).map(
                  function (t, e) {
                    return e ? 8 * t : t;
                  }
                ),
                f = i(s, 2),
                u = f[0],
                h = f[1],
                c = new Uint8Array(a + o + 8);
              c.set(new Uint8Array(e), 0);
              var d = new DataView(c.buffer);
              return (
                d.setUint8(a, 128),
                d.setUint32(a + o, h, !0),
                d.setUint32(a + o + 4, u, !0),
                c.buffer
              );
            },
          },
          {
            key: "f",
            value: function (t, e, r, i) {
              return 0 <= t && t <= 15
                ? e ^ r ^ i
                : 16 <= t && t <= 31
                ? (e & r) | (~e & i)
                : 32 <= t && t <= 47
                ? (e | ~r) ^ i
                : 48 <= t && t <= 63
                ? (e & i) | (r & ~i)
                : 64 <= t && t <= 79
                ? e ^ (r | ~i)
                : void 0;
            },
          },
          {
            key: "K",
            value: function (t) {
              return 0 <= t && t <= 15
                ? 0
                : 16 <= t && t <= 31
                ? 1518500249
                : 32 <= t && t <= 47
                ? 1859775393
                : 48 <= t && t <= 63
                ? 2400959708
                : 64 <= t && t <= 79
                ? 2840853838
                : void 0;
            },
          },
          {
            key: "KP",
            value: function (t) {
              return 0 <= t && t <= 15
                ? 1352829926
                : 16 <= t && t <= 31
                ? 1548603684
                : 32 <= t && t <= 47
                ? 1836072691
                : 48 <= t && t <= 63
                ? 2053994217
                : 64 <= t && t <= 79
                ? 0
                : void 0;
            },
          },
          {
            key: "add_modulo32",
            value: function () {
              return (
                0 |
                Array.from(arguments).reduce(function (t, e) {
                  return t + e;
                }, 0)
              );
            },
          },
          {
            key: "rol32",
            value: function (t, e) {
              return (t << e) | (t >>> (32 - e));
            },
          },
          {
            key: "hash",
            value: function (e) {
              for (
                var r = t.pad(e),
                  i = [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4,
                    13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14,
                    4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0,
                    8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2,
                    10, 14, 1, 3, 8, 11, 6, 15, 13,
                  ],
                  n = [
                    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11,
                    3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3,
                    7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11,
                    15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8,
                    7, 6, 2, 13, 14, 0, 3, 9, 11,
                  ],
                  a = [
                    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7,
                    6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13,
                    6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14,
                    15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6,
                    8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
                  ],
                  o = [
                    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9,
                    13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7,
                    15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8,
                    11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9,
                    12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
                  ],
                  s = r.byteLength / 64,
                  f = new Array(s).fill(void 0).map(function (t, e) {
                    return function (t) {
                      return new DataView(r, 64 * e, 64).getUint32(4 * t, !0);
                    };
                  }),
                  u = [
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ],
                  h = 0;
                h < s;
                ++h
              ) {
                for (
                  var c = u[0],
                    d = u[1],
                    l = u[2],
                    p = u[3],
                    b = u[4],
                    m = c,
                    y = d,
                    v = l,
                    g = p,
                    w = b,
                    _ = 0;
                  _ < 80;
                  ++_
                ) {
                  var M = t.add_modulo32(
                    t.rol32(
                      t.add_modulo32(c, t.f(_, d, l, p), f[h](i[_]), t.K(_)),
                      a[_]
                    ),
                    b
                  );
                  (c = b),
                    (b = p),
                    (p = t.rol32(l, 10)),
                    (l = d),
                    (d = M),
                    (M = t.add_modulo32(
                      t.rol32(
                        t.add_modulo32(
                          m,
                          t.f(79 - _, y, v, g),
                          f[h](n[_]),
                          t.KP(_)
                        ),
                        o[_]
                      ),
                      w
                    )),
                    (m = w),
                    (w = g),
                    (g = t.rol32(v, 10)),
                    (v = y),
                    (y = M);
                }
                var A = t.add_modulo32(u[1], l, g);
                (u[1] = t.add_modulo32(u[2], p, w)),
                  (u[2] = t.add_modulo32(u[3], b, m)),
                  (u[3] = t.add_modulo32(u[4], c, y)),
                  (u[4] = t.add_modulo32(u[0], d, v)),
                  (u[0] = A);
              }
              var x = new ArrayBuffer(20),
                S = new DataView(x);
              return (
                u.forEach(function (t, e) {
                  return S.setUint32(4 * e, t, !0);
                }),
                x
              );
            },
          },
        ]),
        t
      );
    })();
    t.exports = { RIPEMD160: a };
  },
  function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      var i =
          (this && this.__awaiter) ||
          function (t, e, r, i) {
            return new (r || (r = Promise))(function (n, a) {
              function o(t) {
                try {
                  f(i.next(t));
                } catch (t) {
                  a(t);
                }
              }
              function s(t) {
                try {
                  f(i.throw(t));
                } catch (t) {
                  a(t);
                }
              }
              function f(t) {
                var e;
                t.done
                  ? n(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(o, s);
              }
              f((i = i.apply(t, e || [])).next());
            });
          },
        n =
          (this && this.__generator) ||
          function (t, e) {
            var r,
              i,
              n,
              a,
              o = {
                label: 0,
                sent: function () {
                  if (1 & n[0]) throw n[1];
                  return n[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (a = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof Symbol &&
                (a[Symbol.iterator] = function () {
                  return this;
                }),
              a
            );
            function s(a) {
              return function (s) {
                return (function (a) {
                  if (r) throw new TypeError("Generator is already executing.");
                  for (; o; )
                    try {
                      if (
                        ((r = 1),
                        i &&
                          (n =
                            2 & a[0]
                              ? i.return
                              : a[0]
                              ? i.throw || ((n = i.return) && n.call(i), 0)
                              : i.next) &&
                          !(n = n.call(i, a[1])).done)
                      )
                        return n;
                      switch (((i = 0), n && (a = [2 & a[0], n.value]), a[0])) {
                        case 0:
                        case 1:
                          n = a;
                          break;
                        case 4:
                          return o.label++, { value: a[1], done: !1 };
                        case 5:
                          o.label++, (i = a[1]), (a = [0]);
                          continue;
                        case 7:
                          (a = o.ops.pop()), o.trys.pop();
                          continue;
                        default:
                          if (
                            !((n = o.trys),
                            (n = n.length > 0 && n[n.length - 1]) ||
                              (6 !== a[0] && 2 !== a[0]))
                          ) {
                            o = 0;
                            continue;
                          }
                          if (
                            3 === a[0] &&
                            (!n || (a[1] > n[0] && a[1] < n[3]))
                          ) {
                            o.label = a[1];
                            break;
                          }
                          if (6 === a[0] && o.label < n[1]) {
                            (o.label = n[1]), (n = a);
                            break;
                          }
                          if (n && o.label < n[2]) {
                            (o.label = n[2]), o.ops.push(a);
                            break;
                          }
                          n[2] && o.ops.pop(), o.trys.pop();
                          continue;
                      }
                      a = e.call(t, o);
                    } catch (t) {
                      (a = [6, t]), (i = 0);
                    } finally {
                      r = n = 0;
                    }
                  if (5 & a[0]) throw a[1];
                  return { value: a[0] ? a[1] : void 0, done: !0 };
                })([a, s]);
              };
            }
          },
        a =
          (this && this.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              r = e && t[e],
              i = 0;
            if (r) return r.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && i >= t.length && (t = void 0),
                    { value: t && t[i++], done: !t }
                  );
                },
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.JsonRpc = void 0);
      var o = r(2),
        s = r(17),
        f = function (t) {
          var e,
            r,
            i = "";
          try {
            for (var n = a(t), o = n.next(); !o.done; o = n.next()) {
              i += ("00" + o.value.toString(16)).slice(-2);
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              o && !o.done && (r = n.return) && r.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
          return i;
        },
        u = (function () {
          function e(e, r) {
            void 0 === r && (r = {}),
              (this.endpoint = e.replace(/\/$/, "")),
              r.fetch
                ? (this.fetchBuiltin = r.fetch)
                : (this.fetchBuiltin = t.fetch);
          }
          return (
            (e.prototype.fetch = function (t, e) {
              return i(this, void 0, void 0, function () {
                var r, i, a;
                return n(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return (
                        n.trys.push([0, 3, , 4]),
                        [
                          4,
                          (0, this.fetchBuiltin)(this.endpoint + t, {
                            body: JSON.stringify(e),
                            method: "POST",
                          }),
                        ]
                      );
                    case 1:
                      return [4, (r = n.sent()).json()];
                    case 2:
                      if ((i = n.sent()).processed && i.processed.except)
                        throw new s.RpcError(i);
                      if (i.result && i.result.except) throw new s.RpcError(i);
                      return [3, 4];
                    case 3:
                      throw (((a = n.sent()).isFetchError = !0), a);
                    case 4:
                      if (!r.ok) throw new s.RpcError(i);
                      return [2, i];
                  }
                });
              });
            }),
            (e.prototype.abi_bin_to_json = function (t, e, r) {
              return i(this, void 0, void 0, function () {
                return n(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/abi_bin_to_json", {
                          code: t,
                          action: e,
                          binargs: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (e.prototype.abi_json_to_bin = function (t, e, r) {
              return i(this, void 0, void 0, function () {
                return n(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/abi_json_to_bin", {
                          code: t,
                          action: e,
                          args: r,
                        }),
                      ];
                    case 1:
                      return [2, i.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_abi = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_abi", { account_name: t }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_account = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_account", {
                          account_name: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_accounts_by_authorizers = function (t, e) {
              return i(this, void 0, void 0, function () {
                return n(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_accounts_by_authorizers", {
                          accounts: t,
                          keys: e,
                        }),
                      ];
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_activated_protocol_features = function (t) {
              var e = t.limit,
                r = void 0 === e ? 10 : e,
                a = t.search_by_block_num,
                o = void 0 !== a && a,
                s = t.reverse,
                f = void 0 !== s && s,
                u = t.lower_bound,
                h = void 0 === u ? null : u,
                c = t.upper_bound,
                d = void 0 === c ? null : c;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch(
                          "/v1/chain/get_activated_protocol_features",
                          {
                            lower_bound: h,
                            upper_bound: d,
                            limit: r,
                            search_by_block_num: o,
                            reverse: f,
                          }
                        ),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_block_header_state = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block_header_state", {
                          block_num_or_id: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_block_info = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block_info", {
                          block_num: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_block = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_block", {
                          block_num_or_id: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_code = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_code", {
                          account_name: t,
                          code_as_wasm: !0,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_code_hash = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_code_hash", {
                          account_name: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_currency_balance = function (t, e, r) {
              return (
                void 0 === r && (r = null),
                i(this, void 0, void 0, function () {
                  return n(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_currency_balance", {
                            code: t,
                            account: e,
                            symbol: r,
                          }),
                        ];
                      case 1:
                        return [2, i.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.get_currency_stats = function (t, e) {
              return i(this, void 0, void 0, function () {
                return n(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_currency_stats", {
                          code: t,
                          symbol: e,
                        }),
                      ];
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_info = function () {
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this.fetch("/v1/chain/get_info", {})];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_producer_schedule = function () {
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_producer_schedule", {}),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_producers = function (t, e, r) {
              return (
                void 0 === t && (t = !0),
                void 0 === e && (e = ""),
                void 0 === r && (r = 50),
                i(this, void 0, void 0, function () {
                  return n(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_producers", {
                            json: t,
                            lower_bound: e,
                            limit: r,
                          }),
                        ];
                      case 1:
                        return [2, i.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.get_raw_code_and_abi = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_raw_code_and_abi", {
                          account_name: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.getRawAbi = function (t) {
              return i(this, void 0, void 0, function () {
                var e, r;
                return n(this, function (i) {
                  switch (i.label) {
                    case 0:
                      return [4, this.get_raw_abi(t)];
                    case 1:
                      return (
                        (e = i.sent()),
                        (r = o.base64ToBinary(e.abi)),
                        [2, { accountName: e.account_name, abi: r }]
                      );
                  }
                });
              });
            }),
            (e.prototype.get_raw_abi = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_raw_abi", {
                          account_name: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_scheduled_transactions = function (t, e, r) {
              return (
                void 0 === t && (t = !0),
                void 0 === e && (e = ""),
                void 0 === r && (r = 50),
                i(this, void 0, void 0, function () {
                  return n(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/get_scheduled_transactions", {
                            json: t,
                            lower_bound: e,
                            limit: r,
                          }),
                        ];
                      case 1:
                        return [2, i.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.get_table_rows = function (t) {
              var e = t.json,
                r = void 0 === e || e,
                a = t.code,
                o = t.scope,
                s = t.table,
                f = t.lower_bound,
                u = void 0 === f ? "" : f,
                h = t.upper_bound,
                c = void 0 === h ? "" : h,
                d = t.index_position,
                l = void 0 === d ? 1 : d,
                p = t.key_type,
                b = void 0 === p ? "" : p,
                m = t.limit,
                y = void 0 === m ? 10 : m,
                v = t.reverse,
                g = void 0 !== v && v,
                w = t.show_payer,
                _ = void 0 !== w && w;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_table_rows", {
                          json: r,
                          code: a,
                          scope: o,
                          table: s,
                          lower_bound: u,
                          upper_bound: c,
                          index_position: l,
                          key_type: b,
                          limit: y,
                          reverse: g,
                          show_payer: _,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_kv_table_rows = function (t) {
              var e = t.json,
                r = void 0 === e || e,
                a = t.code,
                o = t.table,
                s = t.index_name,
                f = t.encode_type,
                u = void 0 === f ? "bytes" : f,
                h = t.index_value,
                c = t.lower_bound,
                d = t.upper_bound,
                l = t.limit,
                p = void 0 === l ? 10 : l,
                b = t.reverse,
                m = void 0 !== b && b,
                y = t.show_payer,
                v = void 0 !== y && y;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_kv_table_rows", {
                          json: r,
                          code: a,
                          table: o,
                          index_name: s,
                          encode_type: u,
                          index_value: h,
                          lower_bound: c,
                          upper_bound: d,
                          limit: p,
                          reverse: m,
                          show_payer: v,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.get_table_by_scope = function (t) {
              var e = t.code,
                r = t.table,
                a = t.lower_bound,
                o = void 0 === a ? "" : a,
                s = t.upper_bound,
                f = void 0 === s ? "" : s,
                u = t.limit,
                h = void 0 === u ? 10 : u;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/get_table_by_scope", {
                          code: e,
                          table: r,
                          lower_bound: o,
                          upper_bound: f,
                          limit: h,
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.getRequiredKeys = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return n(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (e = o.convertLegacyPublicKeys),
                        [
                          4,
                          this.fetch("/v1/chain/get_required_keys", {
                            transaction: t.transaction,
                            available_keys: t.availableKeys,
                          }),
                        ]
                      );
                    case 1:
                      return [2, e.apply(void 0, [r.sent().required_keys])];
                  }
                });
              });
            }),
            (e.prototype.push_transaction = function (t) {
              var e = t.signatures,
                r = t.compression,
                a = void 0 === r ? 0 : r,
                o = t.serializedTransaction,
                s = t.serializedContextFreeData;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/push_transaction", {
                          signatures: e,
                          compression: a,
                          packed_context_free_data: f(s || new Uint8Array(0)),
                          packed_trx: f(o),
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.push_ro_transaction = function (t, e) {
              var r = t.signatures,
                a = t.compression,
                o = void 0 === a ? 0 : a,
                s = t.serializedTransaction;
              return (
                void 0 === e && (e = !1),
                i(this, void 0, void 0, function () {
                  return n(this, function (t) {
                    switch (t.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/chain/push_ro_transaction", {
                            transaction: {
                              signatures: r,
                              compression: o,
                              packed_context_free_data: f(new Uint8Array(0)),
                              packed_trx: f(s),
                            },
                            return_failure_traces: e,
                          }),
                        ];
                      case 1:
                        return [2, t.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.push_transactions = function (t) {
              return i(this, void 0, void 0, function () {
                var e;
                return n(this, function (r) {
                  switch (r.label) {
                    case 0:
                      return (
                        (e = t.map(function (t) {
                          var e = t.signatures,
                            r = t.compression,
                            i = void 0 === r ? 0 : r,
                            n = t.serializedTransaction,
                            a = t.serializedContextFreeData;
                          return {
                            signatures: e,
                            compression: i,
                            packed_context_free_data: f(a || new Uint8Array(0)),
                            packed_trx: f(n),
                          };
                        })),
                        [4, this.fetch("/v1/chain/push_transactions", e)]
                      );
                    case 1:
                      return [2, r.sent()];
                  }
                });
              });
            }),
            (e.prototype.send_transaction = function (t) {
              var e = t.signatures,
                r = t.compression,
                a = void 0 === r ? 0 : r,
                o = t.serializedTransaction,
                s = t.serializedContextFreeData;
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/chain/send_transaction", {
                          signatures: e,
                          compression: a,
                          packed_context_free_data: f(s || new Uint8Array(0)),
                          packed_trx: f(o),
                        }),
                      ];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.db_size_get = function () {
              return i(this, void 0, void 0, function () {
                return n(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this.fetch("/v1/db_size/get", {})];
                    case 1:
                      return [2, t.sent()];
                  }
                });
              });
            }),
            (e.prototype.trace_get_block = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/trace_api/get_block", { block_num: t }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.history_get_actions = function (t, e, r) {
              return (
                void 0 === e && (e = null),
                void 0 === r && (r = null),
                i(this, void 0, void 0, function () {
                  return n(this, function (i) {
                    switch (i.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/history/get_actions", {
                            account_name: t,
                            pos: e,
                            offset: r,
                          }),
                        ];
                      case 1:
                        return [2, i.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.history_get_transaction = function (t, e) {
              return (
                void 0 === e && (e = null),
                i(this, void 0, void 0, function () {
                  return n(this, function (r) {
                    switch (r.label) {
                      case 0:
                        return [
                          4,
                          this.fetch("/v1/history/get_transaction", {
                            id: t,
                            block_num_hint: e,
                          }),
                        ];
                      case 1:
                        return [2, r.sent()];
                    }
                  });
                })
              );
            }),
            (e.prototype.history_get_key_accounts = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/history/get_key_accounts", {
                          public_key: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            (e.prototype.history_get_controlled_accounts = function (t) {
              return i(this, void 0, void 0, function () {
                return n(this, function (e) {
                  switch (e.label) {
                    case 0:
                      return [
                        4,
                        this.fetch("/v1/history/get_controlled_accounts", {
                          controlling_account: t,
                        }),
                      ];
                    case 1:
                      return [2, e.sent()];
                  }
                });
              });
            }),
            e
          );
        })();
      e.JsonRpc = u;
    }).call(this, r(16));
  },
  function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });
  },
  function (t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.ecc = void 0);
    var i = r(40),
      n = r(5),
      a = r(2);
    e.ecc = {
      initialize: function () {
        return console.error("Method deprecated");
      },
      unsafeRandomKey: function () {
        return console.error("Method deprecated");
      },
      randomKey: function (t, e) {
        void 0 === e && (e = {}),
          void 0 !== t &&
            console.warn(
              "Argument `cpuEntropyBits` is deprecated, use the options argument instead"
            );
        var r = n.generateKeyPair(a.KeyType.k1, e).privateKey;
        return Promise.resolve(r.toLegacyString());
      },
      seedPrivate: function () {
        return console.error("Method deprecated");
      },
      privateToPublic: function (t, e) {
        return (
          void 0 !== e &&
            console.warn(
              "Argument `pubkey_prefix` is deprecated, keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward"
            ),
          i.PrivateKey.fromString(t).getPublicKey().toLegacyString()
        );
      },
      isValidPublic: function (t, e) {
        void 0 !== e &&
          console.warn(
            "Argument `pubkey_prefix` is deprecated, keys prefixed with PUB_K1_/PUB_R1_/PUB_WA_ going forward"
          );
        try {
          return i.PublicKey.fromString(t).isValid();
        } catch (t) {
          return !1;
        }
      },
      isValidPrivate: function (t) {
        try {
          return i.PrivateKey.fromString(t).isValid();
        } catch (t) {
          return !1;
        }
      },
      sign: function (t, e, r) {
        return (
          void 0 === r && (r = "utf8"),
          ("string" == typeof e ? i.PrivateKey.fromString(e) : e)
            .sign(t, !0, r)
            .toString()
        );
      },
      signHash: function (t, e, r) {
        return (
          void 0 === r && (r = "hex"),
          ("string" == typeof e ? i.PrivateKey.fromString(e) : e)
            .sign(t, !1, r)
            .toString()
        );
      },
      verify: function (t, e, r, n, a) {
        void 0 === n && (n = "utf8"), void 0 === a && (a = !0);
        var o = "string" == typeof r ? i.PublicKey.fromString(r) : r;
        return i.Signature.fromString(t).verify(e, o, a, n);
      },
      recover: function (t, e, r) {
        return (
          void 0 === r && (r = "utf8"),
          i.Signature.fromString(t).recover(e, !0, r).toLegacyString()
        );
      },
      recoverHash: function (t, e, r) {
        return (
          void 0 === r && (r = "hex"),
          i.Signature.fromString(t).recover(e, !1, r).toLegacyString()
        );
      },
      sha256: function (t, e, i) {
        return (
          void 0 !== i && console.warn("Argument `encoding` is deprecated"),
          void 0 !== e &&
            console.warn("Argument `resultEncoding` is deprecated"),
          r(5).sha256(t)
        );
      },
    };
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      var i =
          (this && this.__awaiter) ||
          function (t, e, r, i) {
            return new (r || (r = Promise))(function (n, a) {
              function o(t) {
                try {
                  f(i.next(t));
                } catch (t) {
                  a(t);
                }
              }
              function s(t) {
                try {
                  f(i.throw(t));
                } catch (t) {
                  a(t);
                }
              }
              function f(t) {
                var e;
                t.done
                  ? n(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e);
                        })).then(o, s);
              }
              f((i = i.apply(t, e || [])).next());
            });
          },
        n =
          (this && this.__generator) ||
          function (t, e) {
            var r,
              i,
              n,
              a,
              o = {
                label: 0,
                sent: function () {
                  if (1 & n[0]) throw n[1];
                  return n[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (a = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof Symbol &&
                (a[Symbol.iterator] = function () {
                  return this;
                }),
              a
            );
            function s(a) {
              return function (s) {
                return (function (a) {
                  if (r) throw new TypeError("Generator is already executing.");
                  for (; o; )
                    try {
                      if (
                        ((r = 1),
                        i &&
                          (n =
                            2 & a[0]
                              ? i.return
                              : a[0]
                              ? i.throw || ((n = i.return) && n.call(i), 0)
                              : i.next) &&
                          !(n = n.call(i, a[1])).done)
                      )
                        return n;
                      switch (((i = 0), n && (a = [2 & a[0], n.value]), a[0])) {
                        case 0:
                        case 1:
                          n = a;
                          break;
                        case 4:
                          return o.label++, { value: a[1], done: !1 };
                        case 5:
                          o.label++, (i = a[1]), (a = [0]);
                          continue;
                        case 7:
                          (a = o.ops.pop()), o.trys.pop();
                          continue;
                        default:
                          if (
                            !((n = o.trys),
                            (n = n.length > 0 && n[n.length - 1]) ||
                              (6 !== a[0] && 2 !== a[0]))
                          ) {
                            o = 0;
                            continue;
                          }
                          if (
                            3 === a[0] &&
                            (!n || (a[1] > n[0] && a[1] < n[3]))
                          ) {
                            o.label = a[1];
                            break;
                          }
                          if (6 === a[0] && o.label < n[1]) {
                            (o.label = n[1]), (n = a);
                            break;
                          }
                          if (n && o.label < n[2]) {
                            (o.label = n[2]), o.ops.push(a);
                            break;
                          }
                          n[2] && o.ops.pop(), o.trys.pop();
                          continue;
                      }
                      a = e.call(t, o);
                    } catch (t) {
                      (a = [6, t]), (i = 0);
                    } finally {
                      r = n = 0;
                    }
                  if (5 & a[0]) throw a[1];
                  return { value: a[0] ? a[1] : void 0, done: !0 };
                })([a, s]);
              };
            }
          },
        a =
          (this && this.__values) ||
          function (t) {
            var e = "function" == typeof Symbol && Symbol.iterator,
              r = e && t[e],
              i = 0;
            if (r) return r.call(t);
            if (t && "number" == typeof t.length)
              return {
                next: function () {
                  return (
                    t && i >= t.length && (t = void 0),
                    { value: t && t[i++], done: !t }
                  );
                },
              };
            throw new TypeError(
              e ? "Object is not iterable." : "Symbol.iterator is not defined."
            );
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.JsSignatureProvider =
          e.digestFromSerializedData =
          e.Signature =
          e.PublicKey =
          e.PrivateKey =
            void 0);
      var o = r(18),
        s = r(5);
      Object.defineProperty(e, "PrivateKey", {
        enumerable: !0,
        get: function () {
          return s.PrivateKey;
        },
      }),
        Object.defineProperty(e, "PublicKey", {
          enumerable: !0,
          get: function () {
            return s.PublicKey;
          },
        }),
        Object.defineProperty(e, "Signature", {
          enumerable: !0,
          get: function () {
            return s.Signature;
          },
        });
      var f = r(2),
        u = new o.ec("secp256k1"),
        h = function (e, r, i, n) {
          void 0 === n && (n = u);
          var a = t.concat([
            t.from(e, "hex"),
            t.from(r),
            t.from(
              i
                ? new Uint8Array(n.hash().update(i).digest())
                : new Uint8Array(32)
            ),
          ]);
          return n.hash().update(a).digest();
        };
      e.digestFromSerializedData = h;
      var c = (function () {
        function t(t) {
          var e, r;
          (this.keys = new Map()), (this.availableKeys = []);
          try {
            for (var i = a(t), n = i.next(); !n.done; n = i.next()) {
              var o = n.value,
                f = s.PrivateKey.fromString(o),
                u = f.toElliptic(),
                h = f.getPublicKey().toString();
              this.keys.set(h, u), this.availableKeys.push(h);
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              n && !n.done && (r = i.return) && r.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
        }
        return (
          (t.prototype.getAvailableKeys = function () {
            return i(this, void 0, void 0, function () {
              return n(this, function (t) {
                return [2, this.availableKeys];
              });
            });
          }),
          (t.prototype.sign = function (t) {
            var e = t.chainId,
              r = t.requiredKeys,
              o = t.serializedTransaction,
              c = t.serializedContextFreeData;
            return i(this, void 0, void 0, function () {
              var t, i, d, l, p, b, m, y, v, g, w;
              return n(this, function (n) {
                (t = h(e, o, c, u)), (i = []);
                try {
                  for (d = a(r), l = d.next(); !l.done; l = d.next())
                    (p = l.value),
                      (b = s.PublicKey.fromString(p)),
                      (m = this.keys.get(f.convertLegacyPublicKey(p))),
                      (y = s.PrivateKey.fromElliptic(m, b.getType())),
                      (v = y.sign(t, !1)),
                      i.push(v.toString());
                } catch (t) {
                  g = { error: t };
                } finally {
                  try {
                    l && !l.done && (w = d.return) && w.call(d);
                  } finally {
                    if (g) throw g.error;
                  }
                }
                return [
                  2,
                  {
                    signatures: i,
                    serializedTransaction: o,
                    serializedContextFreeData: c,
                  },
                ];
              });
            });
          }),
          t
        );
      })();
      e.JsSignatureProvider = c;
    }).call(this, r(9).Buffer);
  },
  function (t, e, r) {
    "use strict";
    (e.byteLength = function (t) {
      var e = u(t),
        r = e[0],
        i = e[1];
      return (3 * (r + i)) / 4 - i;
    }),
      (e.toByteArray = function (t) {
        var e,
          r,
          i = u(t),
          o = i[0],
          s = i[1],
          f = new a(
            (function (t, e, r) {
              return (3 * (e + r)) / 4 - r;
            })(0, o, s)
          ),
          h = 0,
          c = s > 0 ? o - 4 : o;
        for (r = 0; r < c; r += 4)
          (e =
            (n[t.charCodeAt(r)] << 18) |
            (n[t.charCodeAt(r + 1)] << 12) |
            (n[t.charCodeAt(r + 2)] << 6) |
            n[t.charCodeAt(r + 3)]),
            (f[h++] = (e >> 16) & 255),
            (f[h++] = (e >> 8) & 255),
            (f[h++] = 255 & e);
        2 === s &&
          ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)),
          (f[h++] = 255 & e));
        1 === s &&
          ((e =
            (n[t.charCodeAt(r)] << 10) |
            (n[t.charCodeAt(r + 1)] << 4) |
            (n[t.charCodeAt(r + 2)] >> 2)),
          (f[h++] = (e >> 8) & 255),
          (f[h++] = 255 & e));
        return f;
      }),
      (e.fromByteArray = function (t) {
        for (
          var e, r = t.length, n = r % 3, a = [], o = 0, s = r - n;
          o < s;
          o += 16383
        )
          a.push(h(t, o, o + 16383 > s ? s : o + 16383));
        1 === n
          ? ((e = t[r - 1]), a.push(i[e >> 2] + i[(e << 4) & 63] + "=="))
          : 2 === n &&
            ((e = (t[r - 2] << 8) + t[r - 1]),
            a.push(i[e >> 10] + i[(e >> 4) & 63] + i[(e << 2) & 63] + "="));
        return a.join("");
      });
    for (
      var i = [],
        n = [],
        a = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        s = 0,
        f = o.length;
      s < f;
      ++s
    )
      (i[s] = o[s]), (n[o.charCodeAt(s)] = s);
    function u(t) {
      var e = t.length;
      if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var r = t.indexOf("=");
      return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
    }
    function h(t, e, r) {
      for (var n, a, o = [], s = e; s < r; s += 3)
        (n =
          ((t[s] << 16) & 16711680) +
          ((t[s + 1] << 8) & 65280) +
          (255 & t[s + 2])),
          o.push(
            i[((a = n) >> 18) & 63] +
              i[(a >> 12) & 63] +
              i[(a >> 6) & 63] +
              i[63 & a]
          );
      return o.join("");
    }
    (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
  },
  function (t, e) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    (e.read = function (t, e, r, i, n) {
      var a,
        o,
        s = 8 * n - i - 1,
        f = (1 << s) - 1,
        u = f >> 1,
        h = -7,
        c = r ? n - 1 : 0,
        d = r ? -1 : 1,
        l = t[e + c];
      for (
        c += d, a = l & ((1 << -h) - 1), l >>= -h, h += s;
        h > 0;
        a = 256 * a + t[e + c], c += d, h -= 8
      );
      for (
        o = a & ((1 << -h) - 1), a >>= -h, h += i;
        h > 0;
        o = 256 * o + t[e + c], c += d, h -= 8
      );
      if (0 === a) a = 1 - u;
      else {
        if (a === f) return o ? NaN : (1 / 0) * (l ? -1 : 1);
        (o += Math.pow(2, i)), (a -= u);
      }
      return (l ? -1 : 1) * o * Math.pow(2, a - i);
    }),
      (e.write = function (t, e, r, i, n, a) {
        var o,
          s,
          f,
          u = 8 * a - n - 1,
          h = (1 << u) - 1,
          c = h >> 1,
          d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          l = i ? 0 : a - 1,
          p = i ? 1 : -1,
          b = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((s = isNaN(e) ? 1 : 0), (o = h))
              : ((o = Math.floor(Math.log(e) / Math.LN2)),
                e * (f = Math.pow(2, -o)) < 1 && (o--, (f *= 2)),
                (e += o + c >= 1 ? d / f : d * Math.pow(2, 1 - c)) * f >= 2 &&
                  (o++, (f /= 2)),
                o + c >= h
                  ? ((s = 0), (o = h))
                  : o + c >= 1
                  ? ((s = (e * f - 1) * Math.pow(2, n)), (o += c))
                  : ((s = e * Math.pow(2, c - 1) * Math.pow(2, n)), (o = 0)));
          n >= 8;
          t[r + l] = 255 & s, l += p, s /= 256, n -= 8
        );
        for (
          o = (o << n) | s, u += n;
          u > 0;
          t[r + l] = 255 & o, l += p, o /= 256, u -= 8
        );
        t[r + l - p] |= 128 * b;
      });
  },
  function (t, e) {
    var r = {}.toString;
    t.exports =
      Array.isArray ||
      function (t) {
        return "[object Array]" == r.call(t);
      };
  },
  function (t) {
    t.exports = JSON.parse(
      '{"_args":[["elliptic@6.5.4","/home/aaron/dev/projects/wax/waxjs"]],"_from":"elliptic@6.5.4","_id":"elliptic@6.5.4","_inBundle":false,"_integrity":"sha512-iLhC6ULemrljPZb+QutR5TQGB+pdW6KGD5RSegS+8sorOZT+rdQFbsQFJgvN3eRqNALqJer4oQ16YvJHlU8hzQ==","_location":"/eosjs/elliptic","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"elliptic@6.5.4","name":"elliptic","escapedName":"elliptic","rawSpec":"6.5.4","saveSpec":null,"fetchSpec":"6.5.4"},"_requiredBy":["/eosjs"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.5.4.tgz","_spec":"6.5.4","_where":"/home/aaron/dev/projects/wax/waxjs","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"dependencies":{"bn.js":"^4.11.9","brorand":"^1.1.0","hash.js":"^1.0.0","hmac-drbg":"^1.0.1","inherits":"^2.0.4","minimalistic-assert":"^1.0.1","minimalistic-crypto-utils":"^1.0.1"},"description":"EC cryptography","devDependencies":{"brfs":"^2.0.2","coveralls":"^3.1.0","eslint":"^7.6.0","grunt":"^1.2.1","grunt-browserify":"^5.3.0","grunt-cli":"^1.3.2","grunt-contrib-connect":"^3.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^5.0.0","grunt-mocha-istanbul":"^5.0.2","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.5","mocha":"^8.0.1"},"files":["lib"],"homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","name":"elliptic","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"lint":"eslint lib test","lint:fix":"npm run lint -- --fix","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.5.4"}'
    );
  },
  function (t, e) {},
  function (t, e) {},
  function (t, e, r) {
    "use strict";
    var i = r(0),
      n = r(3),
      a = r(8),
      o = r(10),
      s = i.assert;
    function f(t) {
      o.call(this, "short", t),
        (this.a = new n(t.a, 16).toRed(this.red)),
        (this.b = new n(t.b, 16).toRed(this.red)),
        (this.tinv = this.two.redInvm()),
        (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
        (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
        (this.endo = this._getEndomorphism(t)),
        (this._endoWnafT1 = new Array(4)),
        (this._endoWnafT2 = new Array(4));
    }
    function u(t, e, r, i) {
      o.BasePoint.call(this, t, "affine"),
        null === e && null === r
          ? ((this.x = null), (this.y = null), (this.inf = !0))
          : ((this.x = new n(e, 16)),
            (this.y = new n(r, 16)),
            i &&
              (this.x.forceRed(this.curve.red),
              this.y.forceRed(this.curve.red)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            (this.inf = !1));
    }
    function h(t, e, r, i) {
      o.BasePoint.call(this, t, "jacobian"),
        null === e && null === r && null === i
          ? ((this.x = this.curve.one),
            (this.y = this.curve.one),
            (this.z = new n(0)))
          : ((this.x = new n(e, 16)),
            (this.y = new n(r, 16)),
            (this.z = new n(i, 16))),
        this.x.red || (this.x = this.x.toRed(this.curve.red)),
        this.y.red || (this.y = this.y.toRed(this.curve.red)),
        this.z.red || (this.z = this.z.toRed(this.curve.red)),
        (this.zOne = this.z === this.curve.one);
    }
    a(f, o),
      (t.exports = f),
      (f.prototype._getEndomorphism = function (t) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
          var e, r;
          if (t.beta) e = new n(t.beta, 16).toRed(this.red);
          else {
            var i = this._getEndoRoots(this.p);
            e = (e = i[0].cmp(i[1]) < 0 ? i[0] : i[1]).toRed(this.red);
          }
          if (t.lambda) r = new n(t.lambda, 16);
          else {
            var a = this._getEndoRoots(this.n);
            0 === this.g.mul(a[0]).x.cmp(this.g.x.redMul(e))
              ? (r = a[0])
              : ((r = a[1]), s(0 === this.g.mul(r).x.cmp(this.g.x.redMul(e))));
          }
          return {
            beta: e,
            lambda: r,
            basis: t.basis
              ? t.basis.map(function (t) {
                  return { a: new n(t.a, 16), b: new n(t.b, 16) };
                })
              : this._getEndoBasis(r),
          };
        }
      }),
      (f.prototype._getEndoRoots = function (t) {
        var e = t === this.p ? this.red : n.mont(t),
          r = new n(2).toRed(e).redInvm(),
          i = r.redNeg(),
          a = new n(3).toRed(e).redNeg().redSqrt().redMul(r);
        return [i.redAdd(a).fromRed(), i.redSub(a).fromRed()];
      }),
      (f.prototype._getEndoBasis = function (t) {
        for (
          var e,
            r,
            i,
            a,
            o,
            s,
            f,
            u,
            h,
            c = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
            d = t,
            l = this.n.clone(),
            p = new n(1),
            b = new n(0),
            m = new n(0),
            y = new n(1),
            v = 0;
          0 !== d.cmpn(0);

        ) {
          var g = l.div(d);
          (u = l.sub(g.mul(d))), (h = m.sub(g.mul(p)));
          var w = y.sub(g.mul(b));
          if (!i && u.cmp(c) < 0)
            (e = f.neg()), (r = p), (i = u.neg()), (a = h);
          else if (i && 2 == ++v) break;
          (f = u), (l = d), (d = u), (m = p), (p = h), (y = b), (b = w);
        }
        (o = u.neg()), (s = h);
        var _ = i.sqr().add(a.sqr());
        return (
          o.sqr().add(s.sqr()).cmp(_) >= 0 && ((o = e), (s = r)),
          i.negative && ((i = i.neg()), (a = a.neg())),
          o.negative && ((o = o.neg()), (s = s.neg())),
          [
            { a: i, b: a },
            { a: o, b: s },
          ]
        );
      }),
      (f.prototype._endoSplit = function (t) {
        var e = this.endo.basis,
          r = e[0],
          i = e[1],
          n = i.b.mul(t).divRound(this.n),
          a = r.b.neg().mul(t).divRound(this.n),
          o = n.mul(r.a),
          s = a.mul(i.a),
          f = n.mul(r.b),
          u = a.mul(i.b);
        return { k1: t.sub(o).sub(s), k2: f.add(u).neg() };
      }),
      (f.prototype.pointFromX = function (t, e) {
        (t = new n(t, 16)).red || (t = t.toRed(this.red));
        var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
          i = r.redSqrt();
        if (0 !== i.redSqr().redSub(r).cmp(this.zero))
          throw new Error("invalid point");
        var a = i.fromRed().isOdd();
        return ((e && !a) || (!e && a)) && (i = i.redNeg()), this.point(t, i);
      }),
      (f.prototype.validate = function (t) {
        if (t.inf) return !0;
        var e = t.x,
          r = t.y,
          i = this.a.redMul(e),
          n = e.redSqr().redMul(e).redIAdd(i).redIAdd(this.b);
        return 0 === r.redSqr().redISub(n).cmpn(0);
      }),
      (f.prototype._endoWnafMulAdd = function (t, e, r) {
        for (
          var i = this._endoWnafT1, n = this._endoWnafT2, a = 0;
          a < t.length;
          a++
        ) {
          var o = this._endoSplit(e[a]),
            s = t[a],
            f = s._getBeta();
          o.k1.negative && (o.k1.ineg(), (s = s.neg(!0))),
            o.k2.negative && (o.k2.ineg(), (f = f.neg(!0))),
            (i[2 * a] = s),
            (i[2 * a + 1] = f),
            (n[2 * a] = o.k1),
            (n[2 * a + 1] = o.k2);
        }
        for (var u = this._wnafMulAdd(1, i, n, 2 * a, r), h = 0; h < 2 * a; h++)
          (i[h] = null), (n[h] = null);
        return u;
      }),
      a(u, o.BasePoint),
      (f.prototype.point = function (t, e, r) {
        return new u(this, t, e, r);
      }),
      (f.prototype.pointFromJSON = function (t, e) {
        return u.fromJSON(this, t, e);
      }),
      (u.prototype._getBeta = function () {
        if (this.curve.endo) {
          var t = this.precomputed;
          if (t && t.beta) return t.beta;
          var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
          if (t) {
            var r = this.curve,
              i = function (t) {
                return r.point(t.x.redMul(r.endo.beta), t.y);
              };
            (t.beta = e),
              (e.precomputed = {
                beta: null,
                naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(i) },
                doubles: t.doubles && {
                  step: t.doubles.step,
                  points: t.doubles.points.map(i),
                },
              });
          }
          return e;
        }
      }),
      (u.prototype.toJSON = function () {
        return this.precomputed
          ? [
              this.x,
              this.y,
              this.precomputed && {
                doubles: this.precomputed.doubles && {
                  step: this.precomputed.doubles.step,
                  points: this.precomputed.doubles.points.slice(1),
                },
                naf: this.precomputed.naf && {
                  wnd: this.precomputed.naf.wnd,
                  points: this.precomputed.naf.points.slice(1),
                },
              },
            ]
          : [this.x, this.y];
      }),
      (u.fromJSON = function (t, e, r) {
        "string" == typeof e && (e = JSON.parse(e));
        var i = t.point(e[0], e[1], r);
        if (!e[2]) return i;
        function n(e) {
          return t.point(e[0], e[1], r);
        }
        var a = e[2];
        return (
          (i.precomputed = {
            beta: null,
            doubles: a.doubles && {
              step: a.doubles.step,
              points: [i].concat(a.doubles.points.map(n)),
            },
            naf: a.naf && {
              wnd: a.naf.wnd,
              points: [i].concat(a.naf.points.map(n)),
            },
          }),
          i
        );
      }),
      (u.prototype.inspect = function () {
        return this.isInfinity()
          ? "<EC Point Infinity>"
          : "<EC Point x: " +
              this.x.fromRed().toString(16, 2) +
              " y: " +
              this.y.fromRed().toString(16, 2) +
              ">";
      }),
      (u.prototype.isInfinity = function () {
        return this.inf;
      }),
      (u.prototype.add = function (t) {
        if (this.inf) return t;
        if (t.inf) return this;
        if (this.eq(t)) return this.dbl();
        if (this.neg().eq(t)) return this.curve.point(null, null);
        if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
        var e = this.y.redSub(t.y);
        0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
        var r = e.redSqr().redISub(this.x).redISub(t.x),
          i = e.redMul(this.x.redSub(r)).redISub(this.y);
        return this.curve.point(r, i);
      }),
      (u.prototype.dbl = function () {
        if (this.inf) return this;
        var t = this.y.redAdd(this.y);
        if (0 === t.cmpn(0)) return this.curve.point(null, null);
        var e = this.curve.a,
          r = this.x.redSqr(),
          i = t.redInvm(),
          n = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(i),
          a = n.redSqr().redISub(this.x.redAdd(this.x)),
          o = n.redMul(this.x.redSub(a)).redISub(this.y);
        return this.curve.point(a, o);
      }),
      (u.prototype.getX = function () {
        return this.x.fromRed();
      }),
      (u.prototype.getY = function () {
        return this.y.fromRed();
      }),
      (u.prototype.mul = function (t) {
        return (
          (t = new n(t, 16)),
          this.isInfinity()
            ? this
            : this._hasDoubles(t)
            ? this.curve._fixedNafMul(this, t)
            : this.curve.endo
            ? this.curve._endoWnafMulAdd([this], [t])
            : this.curve._wnafMul(this, t)
        );
      }),
      (u.prototype.mulAdd = function (t, e, r) {
        var i = [this, e],
          n = [t, r];
        return this.curve.endo
          ? this.curve._endoWnafMulAdd(i, n)
          : this.curve._wnafMulAdd(1, i, n, 2);
      }),
      (u.prototype.jmulAdd = function (t, e, r) {
        var i = [this, e],
          n = [t, r];
        return this.curve.endo
          ? this.curve._endoWnafMulAdd(i, n, !0)
          : this.curve._wnafMulAdd(1, i, n, 2, !0);
      }),
      (u.prototype.eq = function (t) {
        return (
          this === t ||
          (this.inf === t.inf &&
            (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
        );
      }),
      (u.prototype.neg = function (t) {
        if (this.inf) return this;
        var e = this.curve.point(this.x, this.y.redNeg());
        if (t && this.precomputed) {
          var r = this.precomputed,
            i = function (t) {
              return t.neg();
            };
          e.precomputed = {
            naf: r.naf && { wnd: r.naf.wnd, points: r.naf.points.map(i) },
            doubles: r.doubles && {
              step: r.doubles.step,
              points: r.doubles.points.map(i),
            },
          };
        }
        return e;
      }),
      (u.prototype.toJ = function () {
        return this.inf
          ? this.curve.jpoint(null, null, null)
          : this.curve.jpoint(this.x, this.y, this.curve.one);
      }),
      a(h, o.BasePoint),
      (f.prototype.jpoint = function (t, e, r) {
        return new h(this, t, e, r);
      }),
      (h.prototype.toP = function () {
        if (this.isInfinity()) return this.curve.point(null, null);
        var t = this.z.redInvm(),
          e = t.redSqr(),
          r = this.x.redMul(e),
          i = this.y.redMul(e).redMul(t);
        return this.curve.point(r, i);
      }),
      (h.prototype.neg = function () {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
      }),
      (h.prototype.add = function (t) {
        if (this.isInfinity()) return t;
        if (t.isInfinity()) return this;
        var e = t.z.redSqr(),
          r = this.z.redSqr(),
          i = this.x.redMul(e),
          n = t.x.redMul(r),
          a = this.y.redMul(e.redMul(t.z)),
          o = t.y.redMul(r.redMul(this.z)),
          s = i.redSub(n),
          f = a.redSub(o);
        if (0 === s.cmpn(0))
          return 0 !== f.cmpn(0)
            ? this.curve.jpoint(null, null, null)
            : this.dbl();
        var u = s.redSqr(),
          h = u.redMul(s),
          c = i.redMul(u),
          d = f.redSqr().redIAdd(h).redISub(c).redISub(c),
          l = f.redMul(c.redISub(d)).redISub(a.redMul(h)),
          p = this.z.redMul(t.z).redMul(s);
        return this.curve.jpoint(d, l, p);
      }),
      (h.prototype.mixedAdd = function (t) {
        if (this.isInfinity()) return t.toJ();
        if (t.isInfinity()) return this;
        var e = this.z.redSqr(),
          r = this.x,
          i = t.x.redMul(e),
          n = this.y,
          a = t.y.redMul(e).redMul(this.z),
          o = r.redSub(i),
          s = n.redSub(a);
        if (0 === o.cmpn(0))
          return 0 !== s.cmpn(0)
            ? this.curve.jpoint(null, null, null)
            : this.dbl();
        var f = o.redSqr(),
          u = f.redMul(o),
          h = r.redMul(f),
          c = s.redSqr().redIAdd(u).redISub(h).redISub(h),
          d = s.redMul(h.redISub(c)).redISub(n.redMul(u)),
          l = this.z.redMul(o);
        return this.curve.jpoint(c, d, l);
      }),
      (h.prototype.dblp = function (t) {
        if (0 === t) return this;
        if (this.isInfinity()) return this;
        if (!t) return this.dbl();
        var e;
        if (this.curve.zeroA || this.curve.threeA) {
          var r = this;
          for (e = 0; e < t; e++) r = r.dbl();
          return r;
        }
        var i = this.curve.a,
          n = this.curve.tinv,
          a = this.x,
          o = this.y,
          s = this.z,
          f = s.redSqr().redSqr(),
          u = o.redAdd(o);
        for (e = 0; e < t; e++) {
          var h = a.redSqr(),
            c = u.redSqr(),
            d = c.redSqr(),
            l = h.redAdd(h).redIAdd(h).redIAdd(i.redMul(f)),
            p = a.redMul(c),
            b = l.redSqr().redISub(p.redAdd(p)),
            m = p.redISub(b),
            y = l.redMul(m);
          y = y.redIAdd(y).redISub(d);
          var v = u.redMul(s);
          e + 1 < t && (f = f.redMul(d)), (a = b), (s = v), (u = y);
        }
        return this.curve.jpoint(a, u.redMul(n), s);
      }),
      (h.prototype.dbl = function () {
        return this.isInfinity()
          ? this
          : this.curve.zeroA
          ? this._zeroDbl()
          : this.curve.threeA
          ? this._threeDbl()
          : this._dbl();
      }),
      (h.prototype._zeroDbl = function () {
        var t, e, r;
        if (this.zOne) {
          var i = this.x.redSqr(),
            n = this.y.redSqr(),
            a = n.redSqr(),
            o = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
          o = o.redIAdd(o);
          var s = i.redAdd(i).redIAdd(i),
            f = s.redSqr().redISub(o).redISub(o),
            u = a.redIAdd(a);
          (u = (u = u.redIAdd(u)).redIAdd(u)),
            (t = f),
            (e = s.redMul(o.redISub(f)).redISub(u)),
            (r = this.y.redAdd(this.y));
        } else {
          var h = this.x.redSqr(),
            c = this.y.redSqr(),
            d = c.redSqr(),
            l = this.x.redAdd(c).redSqr().redISub(h).redISub(d);
          l = l.redIAdd(l);
          var p = h.redAdd(h).redIAdd(h),
            b = p.redSqr(),
            m = d.redIAdd(d);
          (m = (m = m.redIAdd(m)).redIAdd(m)),
            (t = b.redISub(l).redISub(l)),
            (e = p.redMul(l.redISub(t)).redISub(m)),
            (r = (r = this.y.redMul(this.z)).redIAdd(r));
        }
        return this.curve.jpoint(t, e, r);
      }),
      (h.prototype._threeDbl = function () {
        var t, e, r;
        if (this.zOne) {
          var i = this.x.redSqr(),
            n = this.y.redSqr(),
            a = n.redSqr(),
            o = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
          o = o.redIAdd(o);
          var s = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a),
            f = s.redSqr().redISub(o).redISub(o);
          t = f;
          var u = a.redIAdd(a);
          (u = (u = u.redIAdd(u)).redIAdd(u)),
            (e = s.redMul(o.redISub(f)).redISub(u)),
            (r = this.y.redAdd(this.y));
        } else {
          var h = this.z.redSqr(),
            c = this.y.redSqr(),
            d = this.x.redMul(c),
            l = this.x.redSub(h).redMul(this.x.redAdd(h));
          l = l.redAdd(l).redIAdd(l);
          var p = d.redIAdd(d),
            b = (p = p.redIAdd(p)).redAdd(p);
          (t = l.redSqr().redISub(b)),
            (r = this.y.redAdd(this.z).redSqr().redISub(c).redISub(h));
          var m = c.redSqr();
          (m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m)),
            (e = l.redMul(p.redISub(t)).redISub(m));
        }
        return this.curve.jpoint(t, e, r);
      }),
      (h.prototype._dbl = function () {
        var t = this.curve.a,
          e = this.x,
          r = this.y,
          i = this.z,
          n = i.redSqr().redSqr(),
          a = e.redSqr(),
          o = r.redSqr(),
          s = a.redAdd(a).redIAdd(a).redIAdd(t.redMul(n)),
          f = e.redAdd(e),
          u = (f = f.redIAdd(f)).redMul(o),
          h = s.redSqr().redISub(u.redAdd(u)),
          c = u.redISub(h),
          d = o.redSqr();
        d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
        var l = s.redMul(c).redISub(d),
          p = r.redAdd(r).redMul(i);
        return this.curve.jpoint(h, l, p);
      }),
      (h.prototype.trpl = function () {
        if (!this.curve.zeroA) return this.dbl().add(this);
        var t = this.x.redSqr(),
          e = this.y.redSqr(),
          r = this.z.redSqr(),
          i = e.redSqr(),
          n = t.redAdd(t).redIAdd(t),
          a = n.redSqr(),
          o = this.x.redAdd(e).redSqr().redISub(t).redISub(i),
          s = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(
            a
          )).redSqr(),
          f = i.redIAdd(i);
        f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
        var u = n.redIAdd(o).redSqr().redISub(a).redISub(s).redISub(f),
          h = e.redMul(u);
        h = (h = h.redIAdd(h)).redIAdd(h);
        var c = this.x.redMul(s).redISub(h);
        c = (c = c.redIAdd(c)).redIAdd(c);
        var d = this.y.redMul(u.redMul(f.redISub(u)).redISub(o.redMul(s)));
        d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
        var l = this.z.redAdd(o).redSqr().redISub(r).redISub(s);
        return this.curve.jpoint(c, d, l);
      }),
      (h.prototype.mul = function (t, e) {
        return (t = new n(t, e)), this.curve._wnafMul(this, t);
      }),
      (h.prototype.eq = function (t) {
        if ("affine" === t.type) return this.eq(t.toJ());
        if (this === t) return !0;
        var e = this.z.redSqr(),
          r = t.z.redSqr();
        if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
        var i = e.redMul(this.z),
          n = r.redMul(t.z);
        return 0 === this.y.redMul(n).redISub(t.y.redMul(i)).cmpn(0);
      }),
      (h.prototype.eqXToP = function (t) {
        var e = this.z.redSqr(),
          r = t.toRed(this.curve.red).redMul(e);
        if (0 === this.x.cmp(r)) return !0;
        for (var i = t.clone(), n = this.curve.redN.redMul(e); ; ) {
          if ((i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)) return !1;
          if ((r.redIAdd(n), 0 === this.x.cmp(r))) return !0;
        }
      }),
      (h.prototype.inspect = function () {
        return this.isInfinity()
          ? "<EC JPoint Infinity>"
          : "<EC JPoint x: " +
              this.x.toString(16, 2) +
              " y: " +
              this.y.toString(16, 2) +
              " z: " +
              this.z.toString(16, 2) +
              ">";
      }),
      (h.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0);
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(8),
      a = r(10),
      o = r(0);
    function s(t) {
      a.call(this, "mont", t),
        (this.a = new i(t.a, 16).toRed(this.red)),
        (this.b = new i(t.b, 16).toRed(this.red)),
        (this.i4 = new i(4).toRed(this.red).redInvm()),
        (this.two = new i(2).toRed(this.red)),
        (this.a24 = this.i4.redMul(this.a.redAdd(this.two)));
    }
    function f(t, e, r) {
      a.BasePoint.call(this, t, "projective"),
        null === e && null === r
          ? ((this.x = this.curve.one), (this.z = this.curve.zero))
          : ((this.x = new i(e, 16)),
            (this.z = new i(r, 16)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)));
    }
    n(s, a),
      (t.exports = s),
      (s.prototype.validate = function (t) {
        var e = t.normalize().x,
          r = e.redSqr(),
          i = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e);
        return 0 === i.redSqrt().redSqr().cmp(i);
      }),
      n(f, a.BasePoint),
      (s.prototype.decodePoint = function (t, e) {
        return this.point(o.toArray(t, e), 1);
      }),
      (s.prototype.point = function (t, e) {
        return new f(this, t, e);
      }),
      (s.prototype.pointFromJSON = function (t) {
        return f.fromJSON(this, t);
      }),
      (f.prototype.precompute = function () {}),
      (f.prototype._encode = function () {
        return this.getX().toArray("be", this.curve.p.byteLength());
      }),
      (f.fromJSON = function (t, e) {
        return new f(t, e[0], e[1] || t.one);
      }),
      (f.prototype.inspect = function () {
        return this.isInfinity()
          ? "<EC Point Infinity>"
          : "<EC Point x: " +
              this.x.fromRed().toString(16, 2) +
              " z: " +
              this.z.fromRed().toString(16, 2) +
              ">";
      }),
      (f.prototype.isInfinity = function () {
        return 0 === this.z.cmpn(0);
      }),
      (f.prototype.dbl = function () {
        var t = this.x.redAdd(this.z).redSqr(),
          e = this.x.redSub(this.z).redSqr(),
          r = t.redSub(e),
          i = t.redMul(e),
          n = r.redMul(e.redAdd(this.curve.a24.redMul(r)));
        return this.curve.point(i, n);
      }),
      (f.prototype.add = function () {
        throw new Error("Not supported on Montgomery curve");
      }),
      (f.prototype.diffAdd = function (t, e) {
        var r = this.x.redAdd(this.z),
          i = this.x.redSub(this.z),
          n = t.x.redAdd(t.z),
          a = t.x.redSub(t.z).redMul(r),
          o = n.redMul(i),
          s = e.z.redMul(a.redAdd(o).redSqr()),
          f = e.x.redMul(a.redISub(o).redSqr());
        return this.curve.point(s, f);
      }),
      (f.prototype.mul = function (t) {
        for (
          var e = t.clone(), r = this, i = this.curve.point(null, null), n = [];
          0 !== e.cmpn(0);
          e.iushrn(1)
        )
          n.push(e.andln(1));
        for (var a = n.length - 1; a >= 0; a--)
          0 === n[a]
            ? ((r = r.diffAdd(i, this)), (i = i.dbl()))
            : ((i = r.diffAdd(i, this)), (r = r.dbl()));
        return i;
      }),
      (f.prototype.mulAdd = function () {
        throw new Error("Not supported on Montgomery curve");
      }),
      (f.prototype.jumlAdd = function () {
        throw new Error("Not supported on Montgomery curve");
      }),
      (f.prototype.eq = function (t) {
        return 0 === this.getX().cmp(t.getX());
      }),
      (f.prototype.normalize = function () {
        return (
          (this.x = this.x.redMul(this.z.redInvm())),
          (this.z = this.curve.one),
          this
        );
      }),
      (f.prototype.getX = function () {
        return this.normalize(), this.x.fromRed();
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(0),
      n = r(3),
      a = r(8),
      o = r(10),
      s = i.assert;
    function f(t) {
      (this.twisted = 1 != (0 | t.a)),
        (this.mOneA = this.twisted && -1 == (0 | t.a)),
        (this.extended = this.mOneA),
        o.call(this, "edwards", t),
        (this.a = new n(t.a, 16).umod(this.red.m)),
        (this.a = this.a.toRed(this.red)),
        (this.c = new n(t.c, 16).toRed(this.red)),
        (this.c2 = this.c.redSqr()),
        (this.d = new n(t.d, 16).toRed(this.red)),
        (this.dd = this.d.redAdd(this.d)),
        s(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
        (this.oneC = 1 == (0 | t.c));
    }
    function u(t, e, r, i, a) {
      o.BasePoint.call(this, t, "projective"),
        null === e && null === r && null === i
          ? ((this.x = this.curve.zero),
            (this.y = this.curve.one),
            (this.z = this.curve.one),
            (this.t = this.curve.zero),
            (this.zOne = !0))
          : ((this.x = new n(e, 16)),
            (this.y = new n(r, 16)),
            (this.z = i ? new n(i, 16) : this.curve.one),
            (this.t = a && new n(a, 16)),
            this.x.red || (this.x = this.x.toRed(this.curve.red)),
            this.y.red || (this.y = this.y.toRed(this.curve.red)),
            this.z.red || (this.z = this.z.toRed(this.curve.red)),
            this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
            (this.zOne = this.z === this.curve.one),
            this.curve.extended &&
              !this.t &&
              ((this.t = this.x.redMul(this.y)),
              this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
    }
    a(f, o),
      (t.exports = f),
      (f.prototype._mulA = function (t) {
        return this.mOneA ? t.redNeg() : this.a.redMul(t);
      }),
      (f.prototype._mulC = function (t) {
        return this.oneC ? t : this.c.redMul(t);
      }),
      (f.prototype.jpoint = function (t, e, r, i) {
        return this.point(t, e, r, i);
      }),
      (f.prototype.pointFromX = function (t, e) {
        (t = new n(t, 16)).red || (t = t.toRed(this.red));
        var r = t.redSqr(),
          i = this.c2.redSub(this.a.redMul(r)),
          a = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
          o = i.redMul(a.redInvm()),
          s = o.redSqrt();
        if (0 !== s.redSqr().redSub(o).cmp(this.zero))
          throw new Error("invalid point");
        var f = s.fromRed().isOdd();
        return ((e && !f) || (!e && f)) && (s = s.redNeg()), this.point(t, s);
      }),
      (f.prototype.pointFromY = function (t, e) {
        (t = new n(t, 16)).red || (t = t.toRed(this.red));
        var r = t.redSqr(),
          i = r.redSub(this.c2),
          a = r.redMul(this.d).redMul(this.c2).redSub(this.a),
          o = i.redMul(a.redInvm());
        if (0 === o.cmp(this.zero)) {
          if (e) throw new Error("invalid point");
          return this.point(this.zero, t);
        }
        var s = o.redSqrt();
        if (0 !== s.redSqr().redSub(o).cmp(this.zero))
          throw new Error("invalid point");
        return s.fromRed().isOdd() !== e && (s = s.redNeg()), this.point(s, t);
      }),
      (f.prototype.validate = function (t) {
        if (t.isInfinity()) return !0;
        t.normalize();
        var e = t.x.redSqr(),
          r = t.y.redSqr(),
          i = e.redMul(this.a).redAdd(r),
          n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
        return 0 === i.cmp(n);
      }),
      a(u, o.BasePoint),
      (f.prototype.pointFromJSON = function (t) {
        return u.fromJSON(this, t);
      }),
      (f.prototype.point = function (t, e, r, i) {
        return new u(this, t, e, r, i);
      }),
      (u.fromJSON = function (t, e) {
        return new u(t, e[0], e[1], e[2]);
      }),
      (u.prototype.inspect = function () {
        return this.isInfinity()
          ? "<EC Point Infinity>"
          : "<EC Point x: " +
              this.x.fromRed().toString(16, 2) +
              " y: " +
              this.y.fromRed().toString(16, 2) +
              " z: " +
              this.z.fromRed().toString(16, 2) +
              ">";
      }),
      (u.prototype.isInfinity = function () {
        return (
          0 === this.x.cmpn(0) &&
          (0 === this.y.cmp(this.z) ||
            (this.zOne && 0 === this.y.cmp(this.curve.c)))
        );
      }),
      (u.prototype._extDbl = function () {
        var t = this.x.redSqr(),
          e = this.y.redSqr(),
          r = this.z.redSqr();
        r = r.redIAdd(r);
        var i = this.curve._mulA(t),
          n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
          a = i.redAdd(e),
          o = a.redSub(r),
          s = i.redSub(e),
          f = n.redMul(o),
          u = a.redMul(s),
          h = n.redMul(s),
          c = o.redMul(a);
        return this.curve.point(f, u, c, h);
      }),
      (u.prototype._projDbl = function () {
        var t,
          e,
          r,
          i,
          n,
          a,
          o = this.x.redAdd(this.y).redSqr(),
          s = this.x.redSqr(),
          f = this.y.redSqr();
        if (this.curve.twisted) {
          var u = (i = this.curve._mulA(s)).redAdd(f);
          this.zOne
            ? ((t = o.redSub(s).redSub(f).redMul(u.redSub(this.curve.two))),
              (e = u.redMul(i.redSub(f))),
              (r = u.redSqr().redSub(u).redSub(u)))
            : ((n = this.z.redSqr()),
              (a = u.redSub(n).redISub(n)),
              (t = o.redSub(s).redISub(f).redMul(a)),
              (e = u.redMul(i.redSub(f))),
              (r = u.redMul(a)));
        } else
          (i = s.redAdd(f)),
            (n = this.curve._mulC(this.z).redSqr()),
            (a = i.redSub(n).redSub(n)),
            (t = this.curve._mulC(o.redISub(i)).redMul(a)),
            (e = this.curve._mulC(i).redMul(s.redISub(f))),
            (r = i.redMul(a));
        return this.curve.point(t, e, r);
      }),
      (u.prototype.dbl = function () {
        return this.isInfinity()
          ? this
          : this.curve.extended
          ? this._extDbl()
          : this._projDbl();
      }),
      (u.prototype._extAdd = function (t) {
        var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
          r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
          i = this.t.redMul(this.curve.dd).redMul(t.t),
          n = this.z.redMul(t.z.redAdd(t.z)),
          a = r.redSub(e),
          o = n.redSub(i),
          s = n.redAdd(i),
          f = r.redAdd(e),
          u = a.redMul(o),
          h = s.redMul(f),
          c = a.redMul(f),
          d = o.redMul(s);
        return this.curve.point(u, h, d, c);
      }),
      (u.prototype._projAdd = function (t) {
        var e,
          r,
          i = this.z.redMul(t.z),
          n = i.redSqr(),
          a = this.x.redMul(t.x),
          o = this.y.redMul(t.y),
          s = this.curve.d.redMul(a).redMul(o),
          f = n.redSub(s),
          u = n.redAdd(s),
          h = this.x
            .redAdd(this.y)
            .redMul(t.x.redAdd(t.y))
            .redISub(a)
            .redISub(o),
          c = i.redMul(f).redMul(h);
        return (
          this.curve.twisted
            ? ((e = i.redMul(u).redMul(o.redSub(this.curve._mulA(a)))),
              (r = f.redMul(u)))
            : ((e = i.redMul(u).redMul(o.redSub(a))),
              (r = this.curve._mulC(f).redMul(u))),
          this.curve.point(c, e, r)
        );
      }),
      (u.prototype.add = function (t) {
        return this.isInfinity()
          ? t
          : t.isInfinity()
          ? this
          : this.curve.extended
          ? this._extAdd(t)
          : this._projAdd(t);
      }),
      (u.prototype.mul = function (t) {
        return this._hasDoubles(t)
          ? this.curve._fixedNafMul(this, t)
          : this.curve._wnafMul(this, t);
      }),
      (u.prototype.mulAdd = function (t, e, r) {
        return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1);
      }),
      (u.prototype.jmulAdd = function (t, e, r) {
        return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0);
      }),
      (u.prototype.normalize = function () {
        if (this.zOne) return this;
        var t = this.z.redInvm();
        return (
          (this.x = this.x.redMul(t)),
          (this.y = this.y.redMul(t)),
          this.t && (this.t = this.t.redMul(t)),
          (this.z = this.curve.one),
          (this.zOne = !0),
          this
        );
      }),
      (u.prototype.neg = function () {
        return this.curve.point(
          this.x.redNeg(),
          this.y,
          this.z,
          this.t && this.t.redNeg()
        );
      }),
      (u.prototype.getX = function () {
        return this.normalize(), this.x.fromRed();
      }),
      (u.prototype.getY = function () {
        return this.normalize(), this.y.fromRed();
      }),
      (u.prototype.eq = function (t) {
        return (
          this === t ||
          (0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY()))
        );
      }),
      (u.prototype.eqXToP = function (t) {
        var e = t.toRed(this.curve.red).redMul(this.z);
        if (0 === this.x.cmp(e)) return !0;
        for (var r = t.clone(), i = this.curve.redN.redMul(this.z); ; ) {
          if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
          if ((e.redIAdd(i), 0 === this.x.cmp(e))) return !0;
        }
      }),
      (u.prototype.toP = u.prototype.normalize),
      (u.prototype.mixedAdd = u.prototype.add);
  },
  function (t, e) {
    t.exports = {
      doubles: {
        step: 4,
        points: [
          [
            "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
            "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821",
          ],
          [
            "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
            "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf",
          ],
          [
            "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
            "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695",
          ],
          [
            "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
            "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9",
          ],
          [
            "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
            "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36",
          ],
          [
            "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
            "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f",
          ],
          [
            "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
            "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999",
          ],
          [
            "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
            "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09",
          ],
          [
            "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
            "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d",
          ],
          [
            "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
            "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088",
          ],
          [
            "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
            "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d",
          ],
          [
            "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
            "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8",
          ],
          [
            "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
            "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a",
          ],
          [
            "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
            "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453",
          ],
          [
            "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
            "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160",
          ],
          [
            "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
            "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0",
          ],
          [
            "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
            "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6",
          ],
          [
            "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
            "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589",
          ],
          [
            "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
            "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17",
          ],
          [
            "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
            "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda",
          ],
          [
            "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
            "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd",
          ],
          [
            "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
            "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2",
          ],
          [
            "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
            "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6",
          ],
          [
            "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
            "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f",
          ],
          [
            "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
            "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01",
          ],
          [
            "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
            "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3",
          ],
          [
            "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
            "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f",
          ],
          [
            "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
            "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7",
          ],
          [
            "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
            "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78",
          ],
          [
            "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
            "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1",
          ],
          [
            "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
            "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150",
          ],
          [
            "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
            "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82",
          ],
          [
            "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
            "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc",
          ],
          [
            "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
            "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b",
          ],
          [
            "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
            "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51",
          ],
          [
            "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
            "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45",
          ],
          [
            "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
            "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120",
          ],
          [
            "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
            "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84",
          ],
          [
            "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
            "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d",
          ],
          [
            "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
            "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d",
          ],
          [
            "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
            "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8",
          ],
          [
            "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
            "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8",
          ],
          [
            "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
            "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac",
          ],
          [
            "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
            "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f",
          ],
          [
            "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
            "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962",
          ],
          [
            "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
            "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907",
          ],
          [
            "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
            "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec",
          ],
          [
            "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
            "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d",
          ],
          [
            "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
            "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414",
          ],
          [
            "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
            "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd",
          ],
          [
            "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
            "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0",
          ],
          [
            "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
            "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811",
          ],
          [
            "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
            "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1",
          ],
          [
            "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
            "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c",
          ],
          [
            "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
            "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73",
          ],
          [
            "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
            "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd",
          ],
          [
            "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
            "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405",
          ],
          [
            "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
            "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589",
          ],
          [
            "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
            "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e",
          ],
          [
            "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
            "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27",
          ],
          [
            "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
            "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1",
          ],
          [
            "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
            "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482",
          ],
          [
            "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
            "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945",
          ],
          [
            "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
            "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573",
          ],
          [
            "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
            "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82",
          ],
        ],
      },
      naf: {
        wnd: 7,
        points: [
          [
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
            "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672",
          ],
          [
            "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
            "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6",
          ],
          [
            "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
            "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da",
          ],
          [
            "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
            "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37",
          ],
          [
            "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
            "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b",
          ],
          [
            "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
            "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81",
          ],
          [
            "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
            "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58",
          ],
          [
            "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
            "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77",
          ],
          [
            "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
            "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a",
          ],
          [
            "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
            "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c",
          ],
          [
            "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
            "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67",
          ],
          [
            "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
            "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402",
          ],
          [
            "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
            "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55",
          ],
          [
            "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
            "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482",
          ],
          [
            "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
            "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82",
          ],
          [
            "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
            "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396",
          ],
          [
            "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
            "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49",
          ],
          [
            "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
            "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf",
          ],
          [
            "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
            "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a",
          ],
          [
            "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
            "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7",
          ],
          [
            "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
            "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933",
          ],
          [
            "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
            "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a",
          ],
          [
            "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
            "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6",
          ],
          [
            "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
            "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37",
          ],
          [
            "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
            "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e",
          ],
          [
            "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
            "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6",
          ],
          [
            "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
            "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476",
          ],
          [
            "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
            "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40",
          ],
          [
            "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
            "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61",
          ],
          [
            "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
            "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683",
          ],
          [
            "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
            "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5",
          ],
          [
            "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
            "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b",
          ],
          [
            "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
            "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417",
          ],
          [
            "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
            "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868",
          ],
          [
            "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
            "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a",
          ],
          [
            "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
            "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6",
          ],
          [
            "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
            "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996",
          ],
          [
            "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
            "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e",
          ],
          [
            "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
            "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d",
          ],
          [
            "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
            "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2",
          ],
          [
            "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
            "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e",
          ],
          [
            "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
            "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437",
          ],
          [
            "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
            "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311",
          ],
          [
            "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
            "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4",
          ],
          [
            "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
            "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575",
          ],
          [
            "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
            "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d",
          ],
          [
            "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
            "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d",
          ],
          [
            "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
            "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629",
          ],
          [
            "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
            "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06",
          ],
          [
            "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
            "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374",
          ],
          [
            "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
            "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee",
          ],
          [
            "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
            "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1",
          ],
          [
            "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
            "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b",
          ],
          [
            "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
            "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661",
          ],
          [
            "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
            "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6",
          ],
          [
            "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
            "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e",
          ],
          [
            "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
            "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d",
          ],
          [
            "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
            "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc",
          ],
          [
            "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
            "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4",
          ],
          [
            "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
            "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c",
          ],
          [
            "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
            "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b",
          ],
          [
            "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
            "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913",
          ],
          [
            "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
            "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154",
          ],
          [
            "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
            "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865",
          ],
          [
            "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
            "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc",
          ],
          [
            "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
            "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224",
          ],
          [
            "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
            "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e",
          ],
          [
            "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
            "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6",
          ],
          [
            "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
            "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511",
          ],
          [
            "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
            "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b",
          ],
          [
            "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
            "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2",
          ],
          [
            "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
            "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c",
          ],
          [
            "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
            "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3",
          ],
          [
            "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
            "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d",
          ],
          [
            "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
            "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700",
          ],
          [
            "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
            "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4",
          ],
          [
            "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
            "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196",
          ],
          [
            "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
            "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4",
          ],
          [
            "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
            "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257",
          ],
          [
            "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
            "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13",
          ],
          [
            "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
            "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096",
          ],
          [
            "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
            "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38",
          ],
          [
            "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
            "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f",
          ],
          [
            "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
            "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448",
          ],
          [
            "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
            "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a",
          ],
          [
            "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
            "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4",
          ],
          [
            "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
            "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437",
          ],
          [
            "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
            "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7",
          ],
          [
            "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
            "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d",
          ],
          [
            "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
            "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a",
          ],
          [
            "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
            "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54",
          ],
          [
            "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
            "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77",
          ],
          [
            "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
            "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517",
          ],
          [
            "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
            "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10",
          ],
          [
            "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
            "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125",
          ],
          [
            "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
            "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e",
          ],
          [
            "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
            "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1",
          ],
          [
            "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
            "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2",
          ],
          [
            "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
            "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423",
          ],
          [
            "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
            "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8",
          ],
          [
            "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
            "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758",
          ],
          [
            "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
            "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375",
          ],
          [
            "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
            "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d",
          ],
          [
            "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
            "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec",
          ],
          [
            "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
            "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0",
          ],
          [
            "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
            "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c",
          ],
          [
            "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
            "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4",
          ],
          [
            "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
            "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f",
          ],
          [
            "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
            "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649",
          ],
          [
            "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
            "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826",
          ],
          [
            "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
            "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5",
          ],
          [
            "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
            "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87",
          ],
          [
            "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
            "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b",
          ],
          [
            "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
            "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc",
          ],
          [
            "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
            "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c",
          ],
          [
            "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
            "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f",
          ],
          [
            "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
            "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a",
          ],
          [
            "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
            "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46",
          ],
          [
            "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
            "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f",
          ],
          [
            "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
            "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03",
          ],
          [
            "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
            "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08",
          ],
          [
            "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
            "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8",
          ],
          [
            "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
            "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373",
          ],
          [
            "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
            "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3",
          ],
          [
            "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
            "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8",
          ],
          [
            "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
            "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1",
          ],
          [
            "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
            "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9",
          ],
        ],
      },
    };
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(52),
      a = r(0),
      o = r(11),
      s = r(21),
      f = a.assert,
      u = r(53),
      h = r(54);
    function c(t) {
      if (!(this instanceof c)) return new c(t);
      "string" == typeof t &&
        (f(Object.prototype.hasOwnProperty.call(o, t), "Unknown curve " + t),
        (t = o[t])),
        t instanceof o.PresetCurve && (t = { curve: t }),
        (this.curve = t.curve.curve),
        (this.n = this.curve.n),
        (this.nh = this.n.ushrn(1)),
        (this.g = this.curve.g),
        (this.g = t.curve.g),
        this.g.precompute(t.curve.n.bitLength() + 1),
        (this.hash = t.hash || t.curve.hash);
    }
    (t.exports = c),
      (c.prototype.keyPair = function (t) {
        return new u(this, t);
      }),
      (c.prototype.keyFromPrivate = function (t, e) {
        return u.fromPrivate(this, t, e);
      }),
      (c.prototype.keyFromPublic = function (t, e) {
        return u.fromPublic(this, t, e);
      }),
      (c.prototype.genKeyPair = function (t) {
        t || (t = {});
        for (
          var e = new n({
              hash: this.hash,
              pers: t.pers,
              persEnc: t.persEnc || "utf8",
              entropy: t.entropy || s(this.hash.hmacStrength),
              entropyEnc: (t.entropy && t.entropyEnc) || "utf8",
              nonce: this.n.toArray(),
            }),
            r = this.n.byteLength(),
            a = this.n.sub(new i(2));
          ;

        ) {
          var o = new i(e.generate(r));
          if (!(o.cmp(a) > 0)) return o.iaddn(1), this.keyFromPrivate(o);
        }
      }),
      (c.prototype._truncateToN = function (t, e) {
        var r = 8 * t.byteLength() - this.n.bitLength();
        return (
          r > 0 && (t = t.ushrn(r)),
          !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
        );
      }),
      (c.prototype.sign = function (t, e, r, a) {
        "object" == typeof r && ((a = r), (r = null)),
          a || (a = {}),
          (e = this.keyFromPrivate(e, r)),
          (t = this._truncateToN(new i(t, 16)));
        for (
          var o = this.n.byteLength(),
            s = e.getPrivate().toArray("be", o),
            f = t.toArray("be", o),
            u = new n({
              hash: this.hash,
              entropy: s,
              nonce: f,
              pers: a.pers,
              persEnc: a.persEnc || "utf8",
            }),
            c = this.n.sub(new i(1)),
            d = 0;
          ;
          d++
        ) {
          var l = a.k ? a.k(d) : new i(u.generate(this.n.byteLength()));
          if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(c) >= 0)) {
            var p = this.g.mul(l);
            if (!p.isInfinity()) {
              var b = p.getX(),
                m = b.umod(this.n);
              if (0 !== m.cmpn(0)) {
                var y = l.invm(this.n).mul(m.mul(e.getPrivate()).iadd(t));
                if (0 !== (y = y.umod(this.n)).cmpn(0)) {
                  var v = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
                  return (
                    a.canonical &&
                      y.cmp(this.nh) > 0 &&
                      ((y = this.n.sub(y)), (v ^= 1)),
                    new h({ r: m, s: y, recoveryParam: v })
                  );
                }
              }
            }
          }
        }
      }),
      (c.prototype.verify = function (t, e, r, n) {
        (t = this._truncateToN(new i(t, 16))), (r = this.keyFromPublic(r, n));
        var a = (e = new h(e, "hex")).r,
          o = e.s;
        if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
        var s,
          f = o.invm(this.n),
          u = f.mul(t).umod(this.n),
          c = f.mul(a).umod(this.n);
        return this.curve._maxwellTrick
          ? !(s = this.g.jmulAdd(u, r.getPublic(), c)).isInfinity() &&
              s.eqXToP(a)
          : !(s = this.g.mulAdd(u, r.getPublic(), c)).isInfinity() &&
              0 === s.getX().umod(this.n).cmp(a);
      }),
      (c.prototype.recoverPubKey = function (t, e, r, n) {
        f((3 & r) === r, "The recovery param is more than two bits"),
          (e = new h(e, n));
        var a = this.n,
          o = new i(t),
          s = e.r,
          u = e.s,
          c = 1 & r,
          d = r >> 1;
        if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
          throw new Error("Unable to find sencond key candinate");
        s = d
          ? this.curve.pointFromX(s.add(this.curve.n), c)
          : this.curve.pointFromX(s, c);
        var l = e.r.invm(a),
          p = a.sub(o).mul(l).umod(a),
          b = u.mul(l).umod(a);
        return this.g.mulAdd(p, s, b);
      }),
      (c.prototype.getKeyRecoveryParam = function (t, e, r, i) {
        if (null !== (e = new h(e, i)).recoveryParam) return e.recoveryParam;
        for (var n = 0; n < 4; n++) {
          var a;
          try {
            a = this.recoverPubKey(t, e, n);
          } catch (t) {
            continue;
          }
          if (a.eq(r)) return n;
        }
        throw new Error("Unable to find valid recovery factor");
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(6),
      n = r(20),
      a = r(4);
    function o(t) {
      if (!(this instanceof o)) return new o(t);
      (this.hash = t.hash),
        (this.predResist = !!t.predResist),
        (this.outLen = this.hash.outSize),
        (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
        (this._reseed = null),
        (this.reseedInterval = null),
        (this.K = null),
        (this.V = null);
      var e = n.toArray(t.entropy, t.entropyEnc || "hex"),
        r = n.toArray(t.nonce, t.nonceEnc || "hex"),
        i = n.toArray(t.pers, t.persEnc || "hex");
      a(
        e.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      ),
        this._init(e, r, i);
    }
    (t.exports = o),
      (o.prototype._init = function (t, e, r) {
        var i = t.concat(e).concat(r);
        (this.K = new Array(this.outLen / 8)),
          (this.V = new Array(this.outLen / 8));
        for (var n = 0; n < this.V.length; n++)
          (this.K[n] = 0), (this.V[n] = 1);
        this._update(i),
          (this._reseed = 1),
          (this.reseedInterval = 281474976710656);
      }),
      (o.prototype._hmac = function () {
        return new i.hmac(this.hash, this.K);
      }),
      (o.prototype._update = function (t) {
        var e = this._hmac().update(this.V).update([0]);
        t && (e = e.update(t)),
          (this.K = e.digest()),
          (this.V = this._hmac().update(this.V).digest()),
          t &&
            ((this.K = this._hmac()
              .update(this.V)
              .update([1])
              .update(t)
              .digest()),
            (this.V = this._hmac().update(this.V).digest()));
      }),
      (o.prototype.reseed = function (t, e, r, i) {
        "string" != typeof e && ((i = r), (r = e), (e = null)),
          (t = n.toArray(t, e)),
          (r = n.toArray(r, i)),
          a(
            t.length >= this.minEntropy / 8,
            "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
          ),
          this._update(t.concat(r || [])),
          (this._reseed = 1);
      }),
      (o.prototype.generate = function (t, e, r, i) {
        if (this._reseed > this.reseedInterval)
          throw new Error("Reseed is required");
        "string" != typeof e && ((i = r), (r = e), (e = null)),
          r && ((r = n.toArray(r, i || "hex")), this._update(r));
        for (var a = []; a.length < t; )
          (this.V = this._hmac().update(this.V).digest()),
            (a = a.concat(this.V));
        var o = a.slice(0, t);
        return this._update(r), this._reseed++, n.encode(o, e);
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(0).assert;
    function a(t, e) {
      (this.ec = t),
        (this.priv = null),
        (this.pub = null),
        e.priv && this._importPrivate(e.priv, e.privEnc),
        e.pub && this._importPublic(e.pub, e.pubEnc);
    }
    (t.exports = a),
      (a.fromPublic = function (t, e, r) {
        return e instanceof a ? e : new a(t, { pub: e, pubEnc: r });
      }),
      (a.fromPrivate = function (t, e, r) {
        return e instanceof a ? e : new a(t, { priv: e, privEnc: r });
      }),
      (a.prototype.validate = function () {
        var t = this.getPublic();
        return t.isInfinity()
          ? { result: !1, reason: "Invalid public key" }
          : t.validate()
          ? t.mul(this.ec.curve.n).isInfinity()
            ? { result: !0, reason: null }
            : { result: !1, reason: "Public key * N != O" }
          : { result: !1, reason: "Public key is not a point" };
      }),
      (a.prototype.getPublic = function (t, e) {
        return (
          "string" == typeof t && ((e = t), (t = null)),
          this.pub || (this.pub = this.ec.g.mul(this.priv)),
          e ? this.pub.encode(e, t) : this.pub
        );
      }),
      (a.prototype.getPrivate = function (t) {
        return "hex" === t ? this.priv.toString(16, 2) : this.priv;
      }),
      (a.prototype._importPrivate = function (t, e) {
        (this.priv = new i(t, e || 16)),
          (this.priv = this.priv.umod(this.ec.curve.n));
      }),
      (a.prototype._importPublic = function (t, e) {
        if (t.x || t.y)
          return (
            "mont" === this.ec.curve.type
              ? n(t.x, "Need x coordinate")
              : ("short" !== this.ec.curve.type &&
                  "edwards" !== this.ec.curve.type) ||
                n(t.x && t.y, "Need both x and y coordinate"),
            void (this.pub = this.ec.curve.point(t.x, t.y))
          );
        this.pub = this.ec.curve.decodePoint(t, e);
      }),
      (a.prototype.derive = function (t) {
        return (
          t.validate() || n(t.validate(), "public point not validated"),
          t.mul(this.priv).getX()
        );
      }),
      (a.prototype.sign = function (t, e, r) {
        return this.ec.sign(t, this, e, r);
      }),
      (a.prototype.verify = function (t, e) {
        return this.ec.verify(t, e, this);
      }),
      (a.prototype.inspect = function () {
        return (
          "<Key priv: " +
          (this.priv && this.priv.toString(16, 2)) +
          " pub: " +
          (this.pub && this.pub.inspect()) +
          " >"
        );
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(0),
      a = n.assert;
    function o(t, e) {
      if (t instanceof o) return t;
      this._importDER(t, e) ||
        (a(t.r && t.s, "Signature without r or s"),
        (this.r = new i(t.r, 16)),
        (this.s = new i(t.s, 16)),
        void 0 === t.recoveryParam
          ? (this.recoveryParam = null)
          : (this.recoveryParam = t.recoveryParam));
    }
    function s() {
      this.place = 0;
    }
    function f(t, e) {
      var r = t[e.place++];
      if (!(128 & r)) return r;
      var i = 15 & r;
      if (0 === i || i > 4) return !1;
      for (var n = 0, a = 0, o = e.place; a < i; a++, o++)
        (n <<= 8), (n |= t[o]), (n >>>= 0);
      return !(n <= 127) && ((e.place = o), n);
    }
    function u(t) {
      for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r; )
        e++;
      return 0 === e ? t : t.slice(e);
    }
    function h(t, e) {
      if (e < 128) t.push(e);
      else {
        var r = 1 + ((Math.log(e) / Math.LN2) >>> 3);
        for (t.push(128 | r); --r; ) t.push((e >>> (r << 3)) & 255);
        t.push(e);
      }
    }
    (t.exports = o),
      (o.prototype._importDER = function (t, e) {
        t = n.toArray(t, e);
        var r = new s();
        if (48 !== t[r.place++]) return !1;
        var a = f(t, r);
        if (!1 === a) return !1;
        if (a + r.place !== t.length) return !1;
        if (2 !== t[r.place++]) return !1;
        var o = f(t, r);
        if (!1 === o) return !1;
        var u = t.slice(r.place, o + r.place);
        if (((r.place += o), 2 !== t[r.place++])) return !1;
        var h = f(t, r);
        if (!1 === h) return !1;
        if (t.length !== h + r.place) return !1;
        var c = t.slice(r.place, h + r.place);
        if (0 === u[0]) {
          if (!(128 & u[1])) return !1;
          u = u.slice(1);
        }
        if (0 === c[0]) {
          if (!(128 & c[1])) return !1;
          c = c.slice(1);
        }
        return (
          (this.r = new i(u)),
          (this.s = new i(c)),
          (this.recoveryParam = null),
          !0
        );
      }),
      (o.prototype.toDER = function (t) {
        var e = this.r.toArray(),
          r = this.s.toArray();
        for (
          128 & e[0] && (e = [0].concat(e)),
            128 & r[0] && (r = [0].concat(r)),
            e = u(e),
            r = u(r);
          !(r[0] || 128 & r[1]);

        )
          r = r.slice(1);
        var i = [2];
        h(i, e.length), (i = i.concat(e)).push(2), h(i, r.length);
        var a = i.concat(r),
          o = [48];
        return h(o, a.length), (o = o.concat(a)), n.encode(o, t);
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(6),
      n = r(11),
      a = r(0),
      o = a.assert,
      s = a.parseBytes,
      f = r(56),
      u = r(57);
    function h(t) {
      if (
        (o("ed25519" === t, "only tested with ed25519 so far"),
        !(this instanceof h))
      )
        return new h(t);
      (t = n[t].curve),
        (this.curve = t),
        (this.g = t.g),
        this.g.precompute(t.n.bitLength() + 1),
        (this.pointClass = t.point().constructor),
        (this.encodingLength = Math.ceil(t.n.bitLength() / 8)),
        (this.hash = i.sha512);
    }
    (t.exports = h),
      (h.prototype.sign = function (t, e) {
        t = s(t);
        var r = this.keyFromSecret(e),
          i = this.hashInt(r.messagePrefix(), t),
          n = this.g.mul(i),
          a = this.encodePoint(n),
          o = this.hashInt(a, r.pubBytes(), t).mul(r.priv()),
          f = i.add(o).umod(this.curve.n);
        return this.makeSignature({ R: n, S: f, Rencoded: a });
      }),
      (h.prototype.verify = function (t, e, r) {
        (t = s(t)), (e = this.makeSignature(e));
        var i = this.keyFromPublic(r),
          n = this.hashInt(e.Rencoded(), i.pubBytes(), t),
          a = this.g.mul(e.S());
        return e.R().add(i.pub().mul(n)).eq(a);
      }),
      (h.prototype.hashInt = function () {
        for (var t = this.hash(), e = 0; e < arguments.length; e++)
          t.update(arguments[e]);
        return a.intFromLE(t.digest()).umod(this.curve.n);
      }),
      (h.prototype.keyFromPublic = function (t) {
        return f.fromPublic(this, t);
      }),
      (h.prototype.keyFromSecret = function (t) {
        return f.fromSecret(this, t);
      }),
      (h.prototype.makeSignature = function (t) {
        return t instanceof u ? t : new u(this, t);
      }),
      (h.prototype.encodePoint = function (t) {
        var e = t.getY().toArray("le", this.encodingLength);
        return (e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0), e;
      }),
      (h.prototype.decodePoint = function (t) {
        var e = (t = a.parseBytes(t)).length - 1,
          r = t.slice(0, e).concat(-129 & t[e]),
          i = 0 != (128 & t[e]),
          n = a.intFromLE(r);
        return this.curve.pointFromY(n, i);
      }),
      (h.prototype.encodeInt = function (t) {
        return t.toArray("le", this.encodingLength);
      }),
      (h.prototype.decodeInt = function (t) {
        return a.intFromLE(t);
      }),
      (h.prototype.isPoint = function (t) {
        return t instanceof this.pointClass;
      });
  },
  function (t, e, r) {
    "use strict";
    var i = r(0),
      n = i.assert,
      a = i.parseBytes,
      o = i.cachedProperty;
    function s(t, e) {
      (this.eddsa = t),
        (this._secret = a(e.secret)),
        t.isPoint(e.pub) ? (this._pub = e.pub) : (this._pubBytes = a(e.pub));
    }
    (s.fromPublic = function (t, e) {
      return e instanceof s ? e : new s(t, { pub: e });
    }),
      (s.fromSecret = function (t, e) {
        return e instanceof s ? e : new s(t, { secret: e });
      }),
      (s.prototype.secret = function () {
        return this._secret;
      }),
      o(s, "pubBytes", function () {
        return this.eddsa.encodePoint(this.pub());
      }),
      o(s, "pub", function () {
        return this._pubBytes
          ? this.eddsa.decodePoint(this._pubBytes)
          : this.eddsa.g.mul(this.priv());
      }),
      o(s, "privBytes", function () {
        var t = this.eddsa,
          e = this.hash(),
          r = t.encodingLength - 1,
          i = e.slice(0, t.encodingLength);
        return (i[0] &= 248), (i[r] &= 127), (i[r] |= 64), i;
      }),
      o(s, "priv", function () {
        return this.eddsa.decodeInt(this.privBytes());
      }),
      o(s, "hash", function () {
        return this.eddsa.hash().update(this.secret()).digest();
      }),
      o(s, "messagePrefix", function () {
        return this.hash().slice(this.eddsa.encodingLength);
      }),
      (s.prototype.sign = function (t) {
        return (
          n(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
        );
      }),
      (s.prototype.verify = function (t, e) {
        return this.eddsa.verify(t, e, this);
      }),
      (s.prototype.getSecret = function (t) {
        return (
          n(this._secret, "KeyPair is public only"), i.encode(this.secret(), t)
        );
      }),
      (s.prototype.getPublic = function (t) {
        return i.encode(this.pubBytes(), t);
      }),
      (t.exports = s);
  },
  function (t, e, r) {
    "use strict";
    var i = r(3),
      n = r(0),
      a = n.assert,
      o = n.cachedProperty,
      s = n.parseBytes;
    function f(t, e) {
      (this.eddsa = t),
        "object" != typeof e && (e = s(e)),
        Array.isArray(e) &&
          (e = {
            R: e.slice(0, t.encodingLength),
            S: e.slice(t.encodingLength),
          }),
        a(e.R && e.S, "Signature without R or S"),
        t.isPoint(e.R) && (this._R = e.R),
        e.S instanceof i && (this._S = e.S),
        (this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded),
        (this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded);
    }
    o(f, "S", function () {
      return this.eddsa.decodeInt(this.Sencoded());
    }),
      o(f, "R", function () {
        return this.eddsa.decodePoint(this.Rencoded());
      }),
      o(f, "Rencoded", function () {
        return this.eddsa.encodePoint(this.R());
      }),
      o(f, "Sencoded", function () {
        return this.eddsa.encodeInt(this.S());
      }),
      (f.prototype.toBytes = function () {
        return this.Rencoded().concat(this.Sencoded());
      }),
      (f.prototype.toHex = function () {
        return n.encode(this.toBytes(), "hex").toUpperCase();
      }),
      (t.exports = f);
  },
  function (t, e, r) {
    "use strict";
    (function (t) {
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.Signature = void 0);
      var i = r(59),
        n = r(2),
        a = r(5),
        o = (function () {
          function e(t, e) {
            (this.signature = t), (this.ec = e);
          }
          return (
            (e.fromString = function (t, r) {
              var i = n.stringToSignature(t);
              return r || (r = a.constructElliptic(i.type)), new e(i, r);
            }),
            (e.fromElliptic = function (t, r, i) {
              var o,
                s = t.r.toArray("be", 32),
                f = t.s.toArray("be", 32);
              r === n.KeyType.k1 || r === n.KeyType.r1
                ? ((o = t.recoveryParam + 27), t.recoveryParam <= 3 && (o += 4))
                : r === n.KeyType.wa && (o = t.recoveryParam);
              var u = new Uint8Array([o].concat(s, f));
              return (
                i || (i = a.constructElliptic(r)),
                new e({ type: r, data: u }, i)
              );
            }),
            (e.prototype.toElliptic = function () {
              var t,
                e = new i(this.signature.data.slice(1, 33)),
                r = new i(this.signature.data.slice(33, 65));
              return (
                this.signature.type === n.KeyType.k1 ||
                this.signature.type === n.KeyType.r1
                  ? (t = this.signature.data[0] - 27) > 3 && (t -= 4)
                  : this.signature.type === n.KeyType.wa &&
                    (t = this.signature.data[0]),
                { r: e, s: r, recoveryParam: 3 & t }
              );
            }),
            (e.prototype.toString = function () {
              return n.signatureToString(this.signature);
            }),
            (e.prototype.toBinary = function () {
              return this.signature.data;
            }),
            (e.prototype.getType = function () {
              return this.signature.type;
            }),
            (e.prototype.verify = function (e, r, i, n) {
              void 0 === i && (i = !0),
                void 0 === n && (n = "utf8"),
                i &&
                  ("string" == typeof e && (e = t.from(e, n)),
                  (e = this.ec.hash().update(e).digest()));
              var a = this.toElliptic(),
                o = r.toElliptic();
              return this.ec.verify(e, a, o, n);
            }),
            (e.prototype.recover = function (e, r, i) {
              void 0 === r && (r = !0),
                void 0 === i && (i = "utf8"),
                r &&
                  ("string" == typeof e && (e = t.from(e, i)),
                  (e = this.ec.hash().update(e).digest()));
              var n = this.toElliptic(),
                o = this.ec.recoverPubKey(e, n, n.recoveryParam, i),
                s = this.ec.keyFromPublic(o);
              return a.PublicKey.fromElliptic(s, this.getType(), this.ec);
            }),
            e
          );
        })();
      e.Signature = o;
    }).call(this, r(9).Buffer);
  },
  function (t, e, r) {
    (function (t) {
      !(function (t, e) {
        "use strict";
        function i(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function n(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function a(t, e, r) {
          if (a.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        var o;
        "object" == typeof t ? (t.exports = a) : (e.BN = a),
          (a.BN = a),
          (a.wordSize = 26);
        try {
          o =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : r(60).Buffer;
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void i(!1, "Invalid character in " + t);
        }
        function f(t, e, r) {
          var i = s(t, r);
          return r - 1 >= e && (i |= s(t, r - 1) << 4), i;
        }
        function u(t, e, r, n) {
          for (var a = 0, o = 0, s = Math.min(t.length, r), f = e; f < s; f++) {
            var u = t.charCodeAt(f) - 48;
            (a *= n),
              (o = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
              i(u >= 0 && o < n, "Invalid character"),
              (a += o);
          }
          return a;
        }
        function h(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        if (
          ((a.isBN = function (t) {
            return (
              t instanceof a ||
              (null !== t &&
                "object" == typeof t &&
                t.constructor.wordSize === a.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (a.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (a.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (a.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16), i(e === (0 | e) && e >= 2 && e <= 36);
            var n = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (n++, (this.negative = 1)),
              n < t.length &&
                (16 === e
                  ? this._parseHex(t, n, r)
                  : (this._parseBase(t, e, n),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (a.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (i(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (a.prototype._initArray = function (t, e, r) {
            if ((i("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var a,
              o,
              s = 0;
            if ("be" === r)
              for (n = t.length - 1, a = 0; n >= 0; n -= 3)
                (o = t[n] | (t[n - 1] << 8) | (t[n - 2] << 16)),
                  (this.words[a] |= (o << s) & 67108863),
                  (this.words[a + 1] = (o >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), a++);
            else if ("le" === r)
              for (n = 0, a = 0; n < t.length; n += 3)
                (o = t[n] | (t[n + 1] << 8) | (t[n + 2] << 16)),
                  (this.words[a] |= (o << s) & 67108863),
                  (this.words[a + 1] = (o >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), a++);
            return this._strip();
          }),
          (a.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var n,
              a = 0,
              o = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = f(t, e, i) << a),
                  (this.words[o] |= 67108863 & n),
                  a >= 18
                    ? ((a -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (a += 8);
            else
              for (
                i = (t.length - e) % 2 == 0 ? e + 1 : e;
                i < t.length;
                i += 2
              )
                (n = f(t, e, i) << a),
                  (this.words[o] |= 67108863 & n),
                  a >= 18
                    ? ((a -= 18), (o += 1), (this.words[o] |= n >>> 26))
                    : (a += 8);
            this._strip();
          }),
          (a.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var i = 0, n = 1; n <= 67108863; n *= e) i++;
            i--, (n = (n / e) | 0);
            for (
              var a = t.length - r,
                o = a % i,
                s = Math.min(a, a - o) + r,
                f = 0,
                h = r;
              h < s;
              h += i
            )
              (f = u(t, h, h + i, e)),
                this.imuln(n),
                this.words[0] + f < 67108864
                  ? (this.words[0] += f)
                  : this._iaddn(f);
            if (0 !== o) {
              var c = 1;
              for (f = u(t, h, t.length, e), h = 0; h < o; h++) c *= e;
              this.imuln(c),
                this.words[0] + f < 67108864
                  ? (this.words[0] += f)
                  : this._iaddn(f);
            }
            this._strip();
          }),
          (a.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (a.prototype._move = function (t) {
            h(t, this);
          }),
          (a.prototype.clone = function () {
            var t = new a(null);
            return this.copy(t), t;
          }),
          (a.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (a.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (a.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" != typeof Symbol && "function" == typeof Symbol.for)
        )
          try {
            a.prototype[Symbol.for("nodejs.util.inspect.custom")] = c;
          } catch (t) {
            a.prototype.inspect = c;
          }
        else a.prototype.inspect = c;
        function c() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var d = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          l = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        (a.prototype.toString = function (t, e) {
          var r;
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            r = "";
            for (var n = 0, a = 0, o = 0; o < this.length; o++) {
              var s = this.words[o],
                f = (16777215 & ((s << n) | a)).toString(16);
              (r =
                0 !== (a = (s >>> (24 - n)) & 16777215) || o !== this.length - 1
                  ? d[6 - f.length] + f + r
                  : f + r),
                (n += 2) >= 26 && ((n -= 26), o--);
            }
            for (0 !== a && (r = a.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var u = l[t],
              h = p[t];
            r = "";
            var c = this.clone();
            for (c.negative = 0; !c.isZero(); ) {
              var b = c.modrn(h).toString(t);
              r = (c = c.idivn(h)).isZero() ? b + r : d[u - b.length] + b + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          i(!1, "Base should be between 2 and 36");
        }),
          (a.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  i(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (a.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          o &&
            (a.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(o, t, e);
            }),
          (a.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          });
        function b(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var i = (t.length + e.length) | 0;
          (r.length = i), (i = (i - 1) | 0);
          var n = 0 | t.words[0],
            a = 0 | e.words[0],
            o = n * a,
            s = 67108863 & o,
            f = (o / 67108864) | 0;
          r.words[0] = s;
          for (var u = 1; u < i; u++) {
            for (
              var h = f >>> 26,
                c = 67108863 & f,
                d = Math.min(u, e.length - 1),
                l = Math.max(0, u - t.length + 1);
              l <= d;
              l++
            ) {
              var p = (u - l) | 0;
              (h +=
                ((o = (n = 0 | t.words[p]) * (a = 0 | e.words[l]) + c) /
                  67108864) |
                0),
                (c = 67108863 & o);
            }
            (r.words[u] = 0 | c), (f = 0 | h);
          }
          return 0 !== f ? (r.words[u] = 0 | f) : r.length--, r._strip();
        }
        (a.prototype.toArrayLike = function (t, e, r) {
          this._strip();
          var n = this.byteLength(),
            a = r || Math.max(1, n);
          i(n <= a, "byte array longer than desired length"),
            i(a > 0, "Requested array length <= 0");
          var o = (function (t, e) {
            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
          })(t, a);
          return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](o, n), o;
        }),
          (a.prototype._toArrayLikeLE = function (t, e) {
            for (var r = 0, i = 0, n = 0, a = 0; n < this.length; n++) {
              var o = (this.words[n] << a) | i;
              (t[r++] = 255 & o),
                r < t.length && (t[r++] = (o >> 8) & 255),
                r < t.length && (t[r++] = (o >> 16) & 255),
                6 === a
                  ? (r < t.length && (t[r++] = (o >> 24) & 255),
                    (i = 0),
                    (a = 0))
                  : ((i = o >>> 24), (a += 2));
            }
            if (r < t.length) for (t[r++] = i; r < t.length; ) t[r++] = 0;
          }),
          (a.prototype._toArrayLikeBE = function (t, e) {
            for (
              var r = t.length - 1, i = 0, n = 0, a = 0;
              n < this.length;
              n++
            ) {
              var o = (this.words[n] << a) | i;
              (t[r--] = 255 & o),
                r >= 0 && (t[r--] = (o >> 8) & 255),
                r >= 0 && (t[r--] = (o >> 16) & 255),
                6 === a
                  ? (r >= 0 && (t[r--] = (o >> 24) & 255), (i = 0), (a = 0))
                  : ((i = o >>> 24), (a += 2));
            }
            if (r >= 0) for (t[r--] = i; r >= 0; ) t[r--] = 0;
          }),
          Math.clz32
            ? (a.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (a.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (a.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              0 == (8191 & e) && ((r += 13), (e >>>= 13)),
              0 == (127 & e) && ((r += 7), (e >>>= 7)),
              0 == (15 & e) && ((r += 4), (e >>>= 4)),
              0 == (3 & e) && ((r += 2), (e >>>= 2)),
              0 == (1 & e) && r++,
              r
            );
          }),
          (a.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (a.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (a.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (a.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (a.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (a.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (a.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (a.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (a.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (a.prototype.ior = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuor(t);
          }),
          (a.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (a.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (a.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this._strip();
          }),
          (a.prototype.iand = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuand(t);
          }),
          (a.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (a.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (a.prototype.iuxor = function (t) {
            var e, r;
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var i = 0; i < r.length; i++)
              this.words[i] = e.words[i] ^ r.words[i];
            if (this !== e)
              for (; i < e.length; i++) this.words[i] = e.words[i];
            return (this.length = e.length), this._strip();
          }),
          (a.prototype.ixor = function (t) {
            return i(0 == (this.negative | t.negative)), this.iuxor(t);
          }),
          (a.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (a.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (a.prototype.inotn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var n = 0; n < e; n++)
              this.words[n] = 67108863 & ~this.words[n];
            return (
              r > 0 &&
                (this.words[n] = ~this.words[n] & (67108863 >> (26 - r))),
              this._strip()
            );
          }),
          (a.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (a.prototype.setn = function (t, e) {
            i("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              n = t % 26;
            return (
              this._expand(r + 1),
              (this.words[r] = e
                ? this.words[r] | (1 << n)
                : this.words[r] & ~(1 << n)),
              this._strip()
            );
          }),
          (a.prototype.iadd = function (t) {
            var e, r, i;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (i = t))
              : ((r = t), (i = this));
            for (var n = 0, a = 0; a < i.length; a++)
              (e = (0 | r.words[a]) + (0 | i.words[a]) + n),
                (this.words[a] = 67108863 & e),
                (n = e >>> 26);
            for (; 0 !== n && a < r.length; a++)
              (e = (0 | r.words[a]) + n),
                (this.words[a] = 67108863 & e),
                (n = e >>> 26);
            if (((this.length = r.length), 0 !== n))
              (this.words[this.length] = n), this.length++;
            else if (r !== this)
              for (; a < r.length; a++) this.words[a] = r.words[a];
            return this;
          }),
          (a.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (a.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var r,
              i,
              n = this.cmp(t);
            if (0 === n)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            n > 0 ? ((r = this), (i = t)) : ((r = t), (i = this));
            for (var a = 0, o = 0; o < i.length; o++)
              (a = (e = (0 | r.words[o]) - (0 | i.words[o]) + a) >> 26),
                (this.words[o] = 67108863 & e);
            for (; 0 !== a && o < r.length; o++)
              (a = (e = (0 | r.words[o]) + a) >> 26),
                (this.words[o] = 67108863 & e);
            if (0 === a && o < r.length && r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return (
              (this.length = Math.max(this.length, o)),
              r !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (a.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var m = function (t, e, r) {
          var i,
            n,
            a,
            o = t.words,
            s = e.words,
            f = r.words,
            u = 0,
            h = 0 | o[0],
            c = 8191 & h,
            d = h >>> 13,
            l = 0 | o[1],
            p = 8191 & l,
            b = l >>> 13,
            m = 0 | o[2],
            y = 8191 & m,
            v = m >>> 13,
            g = 0 | o[3],
            w = 8191 & g,
            _ = g >>> 13,
            M = 0 | o[4],
            A = 8191 & M,
            x = M >>> 13,
            S = 0 | o[5],
            k = 8191 & S,
            z = S >>> 13,
            E = 0 | o[6],
            T = 8191 & E,
            R = E >>> 13,
            P = 0 | o[7],
            I = 8191 & P,
            N = P >>> 13,
            U = 0 | o[8],
            B = 8191 & U,
            O = U >>> 13,
            D = 0 | o[9],
            L = 8191 & D,
            K = D >>> 13,
            C = 0 | s[0],
            j = 8191 & C,
            q = C >>> 13,
            F = 0 | s[1],
            Z = 8191 & F,
            V = F >>> 13,
            Y = 0 | s[2],
            H = 8191 & Y,
            W = Y >>> 13,
            J = 0 | s[3],
            G = 8191 & J,
            X = J >>> 13,
            Q = 0 | s[4],
            $ = 8191 & Q,
            tt = Q >>> 13,
            et = 0 | s[5],
            rt = 8191 & et,
            it = et >>> 13,
            nt = 0 | s[6],
            at = 8191 & nt,
            ot = nt >>> 13,
            st = 0 | s[7],
            ft = 8191 & st,
            ut = st >>> 13,
            ht = 0 | s[8],
            ct = 8191 & ht,
            dt = ht >>> 13,
            lt = 0 | s[9],
            pt = 8191 & lt,
            bt = lt >>> 13;
          (r.negative = t.negative ^ e.negative), (r.length = 19);
          var mt =
            (((u + (i = Math.imul(c, j))) | 0) +
              ((8191 & (n = ((n = Math.imul(c, q)) + Math.imul(d, j)) | 0)) <<
                13)) |
            0;
          (u = ((((a = Math.imul(d, q)) + (n >>> 13)) | 0) + (mt >>> 26)) | 0),
            (mt &= 67108863),
            (i = Math.imul(p, j)),
            (n = ((n = Math.imul(p, q)) + Math.imul(b, j)) | 0),
            (a = Math.imul(b, q));
          var yt =
            (((u + (i = (i + Math.imul(c, Z)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, V)) | 0) + Math.imul(d, Z)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, V)) | 0) + (n >>> 13)) | 0) +
              (yt >>> 26)) |
            0),
            (yt &= 67108863),
            (i = Math.imul(y, j)),
            (n = ((n = Math.imul(y, q)) + Math.imul(v, j)) | 0),
            (a = Math.imul(v, q)),
            (i = (i + Math.imul(p, Z)) | 0),
            (n = ((n = (n + Math.imul(p, V)) | 0) + Math.imul(b, Z)) | 0),
            (a = (a + Math.imul(b, V)) | 0);
          var vt =
            (((u + (i = (i + Math.imul(c, H)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, W)) | 0) + Math.imul(d, H)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, W)) | 0) + (n >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (i = Math.imul(w, j)),
            (n = ((n = Math.imul(w, q)) + Math.imul(_, j)) | 0),
            (a = Math.imul(_, q)),
            (i = (i + Math.imul(y, Z)) | 0),
            (n = ((n = (n + Math.imul(y, V)) | 0) + Math.imul(v, Z)) | 0),
            (a = (a + Math.imul(v, V)) | 0),
            (i = (i + Math.imul(p, H)) | 0),
            (n = ((n = (n + Math.imul(p, W)) | 0) + Math.imul(b, H)) | 0),
            (a = (a + Math.imul(b, W)) | 0);
          var gt =
            (((u + (i = (i + Math.imul(c, G)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, X)) | 0) + Math.imul(d, G)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, X)) | 0) + (n >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (i = Math.imul(A, j)),
            (n = ((n = Math.imul(A, q)) + Math.imul(x, j)) | 0),
            (a = Math.imul(x, q)),
            (i = (i + Math.imul(w, Z)) | 0),
            (n = ((n = (n + Math.imul(w, V)) | 0) + Math.imul(_, Z)) | 0),
            (a = (a + Math.imul(_, V)) | 0),
            (i = (i + Math.imul(y, H)) | 0),
            (n = ((n = (n + Math.imul(y, W)) | 0) + Math.imul(v, H)) | 0),
            (a = (a + Math.imul(v, W)) | 0),
            (i = (i + Math.imul(p, G)) | 0),
            (n = ((n = (n + Math.imul(p, X)) | 0) + Math.imul(b, G)) | 0),
            (a = (a + Math.imul(b, X)) | 0);
          var wt =
            (((u + (i = (i + Math.imul(c, $)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, tt)) | 0) + Math.imul(d, $)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, tt)) | 0) + (n >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (i = Math.imul(k, j)),
            (n = ((n = Math.imul(k, q)) + Math.imul(z, j)) | 0),
            (a = Math.imul(z, q)),
            (i = (i + Math.imul(A, Z)) | 0),
            (n = ((n = (n + Math.imul(A, V)) | 0) + Math.imul(x, Z)) | 0),
            (a = (a + Math.imul(x, V)) | 0),
            (i = (i + Math.imul(w, H)) | 0),
            (n = ((n = (n + Math.imul(w, W)) | 0) + Math.imul(_, H)) | 0),
            (a = (a + Math.imul(_, W)) | 0),
            (i = (i + Math.imul(y, G)) | 0),
            (n = ((n = (n + Math.imul(y, X)) | 0) + Math.imul(v, G)) | 0),
            (a = (a + Math.imul(v, X)) | 0),
            (i = (i + Math.imul(p, $)) | 0),
            (n = ((n = (n + Math.imul(p, tt)) | 0) + Math.imul(b, $)) | 0),
            (a = (a + Math.imul(b, tt)) | 0);
          var _t =
            (((u + (i = (i + Math.imul(c, rt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, it)) | 0) + Math.imul(d, rt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, it)) | 0) + (n >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (i = Math.imul(T, j)),
            (n = ((n = Math.imul(T, q)) + Math.imul(R, j)) | 0),
            (a = Math.imul(R, q)),
            (i = (i + Math.imul(k, Z)) | 0),
            (n = ((n = (n + Math.imul(k, V)) | 0) + Math.imul(z, Z)) | 0),
            (a = (a + Math.imul(z, V)) | 0),
            (i = (i + Math.imul(A, H)) | 0),
            (n = ((n = (n + Math.imul(A, W)) | 0) + Math.imul(x, H)) | 0),
            (a = (a + Math.imul(x, W)) | 0),
            (i = (i + Math.imul(w, G)) | 0),
            (n = ((n = (n + Math.imul(w, X)) | 0) + Math.imul(_, G)) | 0),
            (a = (a + Math.imul(_, X)) | 0),
            (i = (i + Math.imul(y, $)) | 0),
            (n = ((n = (n + Math.imul(y, tt)) | 0) + Math.imul(v, $)) | 0),
            (a = (a + Math.imul(v, tt)) | 0),
            (i = (i + Math.imul(p, rt)) | 0),
            (n = ((n = (n + Math.imul(p, it)) | 0) + Math.imul(b, rt)) | 0),
            (a = (a + Math.imul(b, it)) | 0);
          var Mt =
            (((u + (i = (i + Math.imul(c, at)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, ot)) | 0) + Math.imul(d, at)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, ot)) | 0) + (n >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (i = Math.imul(I, j)),
            (n = ((n = Math.imul(I, q)) + Math.imul(N, j)) | 0),
            (a = Math.imul(N, q)),
            (i = (i + Math.imul(T, Z)) | 0),
            (n = ((n = (n + Math.imul(T, V)) | 0) + Math.imul(R, Z)) | 0),
            (a = (a + Math.imul(R, V)) | 0),
            (i = (i + Math.imul(k, H)) | 0),
            (n = ((n = (n + Math.imul(k, W)) | 0) + Math.imul(z, H)) | 0),
            (a = (a + Math.imul(z, W)) | 0),
            (i = (i + Math.imul(A, G)) | 0),
            (n = ((n = (n + Math.imul(A, X)) | 0) + Math.imul(x, G)) | 0),
            (a = (a + Math.imul(x, X)) | 0),
            (i = (i + Math.imul(w, $)) | 0),
            (n = ((n = (n + Math.imul(w, tt)) | 0) + Math.imul(_, $)) | 0),
            (a = (a + Math.imul(_, tt)) | 0),
            (i = (i + Math.imul(y, rt)) | 0),
            (n = ((n = (n + Math.imul(y, it)) | 0) + Math.imul(v, rt)) | 0),
            (a = (a + Math.imul(v, it)) | 0),
            (i = (i + Math.imul(p, at)) | 0),
            (n = ((n = (n + Math.imul(p, ot)) | 0) + Math.imul(b, at)) | 0),
            (a = (a + Math.imul(b, ot)) | 0);
          var At =
            (((u + (i = (i + Math.imul(c, ft)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, ut)) | 0) + Math.imul(d, ft)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, ut)) | 0) + (n >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (i = Math.imul(B, j)),
            (n = ((n = Math.imul(B, q)) + Math.imul(O, j)) | 0),
            (a = Math.imul(O, q)),
            (i = (i + Math.imul(I, Z)) | 0),
            (n = ((n = (n + Math.imul(I, V)) | 0) + Math.imul(N, Z)) | 0),
            (a = (a + Math.imul(N, V)) | 0),
            (i = (i + Math.imul(T, H)) | 0),
            (n = ((n = (n + Math.imul(T, W)) | 0) + Math.imul(R, H)) | 0),
            (a = (a + Math.imul(R, W)) | 0),
            (i = (i + Math.imul(k, G)) | 0),
            (n = ((n = (n + Math.imul(k, X)) | 0) + Math.imul(z, G)) | 0),
            (a = (a + Math.imul(z, X)) | 0),
            (i = (i + Math.imul(A, $)) | 0),
            (n = ((n = (n + Math.imul(A, tt)) | 0) + Math.imul(x, $)) | 0),
            (a = (a + Math.imul(x, tt)) | 0),
            (i = (i + Math.imul(w, rt)) | 0),
            (n = ((n = (n + Math.imul(w, it)) | 0) + Math.imul(_, rt)) | 0),
            (a = (a + Math.imul(_, it)) | 0),
            (i = (i + Math.imul(y, at)) | 0),
            (n = ((n = (n + Math.imul(y, ot)) | 0) + Math.imul(v, at)) | 0),
            (a = (a + Math.imul(v, ot)) | 0),
            (i = (i + Math.imul(p, ft)) | 0),
            (n = ((n = (n + Math.imul(p, ut)) | 0) + Math.imul(b, ft)) | 0),
            (a = (a + Math.imul(b, ut)) | 0);
          var xt =
            (((u + (i = (i + Math.imul(c, ct)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, dt)) | 0) + Math.imul(d, ct)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, dt)) | 0) + (n >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (i = Math.imul(L, j)),
            (n = ((n = Math.imul(L, q)) + Math.imul(K, j)) | 0),
            (a = Math.imul(K, q)),
            (i = (i + Math.imul(B, Z)) | 0),
            (n = ((n = (n + Math.imul(B, V)) | 0) + Math.imul(O, Z)) | 0),
            (a = (a + Math.imul(O, V)) | 0),
            (i = (i + Math.imul(I, H)) | 0),
            (n = ((n = (n + Math.imul(I, W)) | 0) + Math.imul(N, H)) | 0),
            (a = (a + Math.imul(N, W)) | 0),
            (i = (i + Math.imul(T, G)) | 0),
            (n = ((n = (n + Math.imul(T, X)) | 0) + Math.imul(R, G)) | 0),
            (a = (a + Math.imul(R, X)) | 0),
            (i = (i + Math.imul(k, $)) | 0),
            (n = ((n = (n + Math.imul(k, tt)) | 0) + Math.imul(z, $)) | 0),
            (a = (a + Math.imul(z, tt)) | 0),
            (i = (i + Math.imul(A, rt)) | 0),
            (n = ((n = (n + Math.imul(A, it)) | 0) + Math.imul(x, rt)) | 0),
            (a = (a + Math.imul(x, it)) | 0),
            (i = (i + Math.imul(w, at)) | 0),
            (n = ((n = (n + Math.imul(w, ot)) | 0) + Math.imul(_, at)) | 0),
            (a = (a + Math.imul(_, ot)) | 0),
            (i = (i + Math.imul(y, ft)) | 0),
            (n = ((n = (n + Math.imul(y, ut)) | 0) + Math.imul(v, ft)) | 0),
            (a = (a + Math.imul(v, ut)) | 0),
            (i = (i + Math.imul(p, ct)) | 0),
            (n = ((n = (n + Math.imul(p, dt)) | 0) + Math.imul(b, ct)) | 0),
            (a = (a + Math.imul(b, dt)) | 0);
          var St =
            (((u + (i = (i + Math.imul(c, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(c, bt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(d, bt)) | 0) + (n >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (i = Math.imul(L, Z)),
            (n = ((n = Math.imul(L, V)) + Math.imul(K, Z)) | 0),
            (a = Math.imul(K, V)),
            (i = (i + Math.imul(B, H)) | 0),
            (n = ((n = (n + Math.imul(B, W)) | 0) + Math.imul(O, H)) | 0),
            (a = (a + Math.imul(O, W)) | 0),
            (i = (i + Math.imul(I, G)) | 0),
            (n = ((n = (n + Math.imul(I, X)) | 0) + Math.imul(N, G)) | 0),
            (a = (a + Math.imul(N, X)) | 0),
            (i = (i + Math.imul(T, $)) | 0),
            (n = ((n = (n + Math.imul(T, tt)) | 0) + Math.imul(R, $)) | 0),
            (a = (a + Math.imul(R, tt)) | 0),
            (i = (i + Math.imul(k, rt)) | 0),
            (n = ((n = (n + Math.imul(k, it)) | 0) + Math.imul(z, rt)) | 0),
            (a = (a + Math.imul(z, it)) | 0),
            (i = (i + Math.imul(A, at)) | 0),
            (n = ((n = (n + Math.imul(A, ot)) | 0) + Math.imul(x, at)) | 0),
            (a = (a + Math.imul(x, ot)) | 0),
            (i = (i + Math.imul(w, ft)) | 0),
            (n = ((n = (n + Math.imul(w, ut)) | 0) + Math.imul(_, ft)) | 0),
            (a = (a + Math.imul(_, ut)) | 0),
            (i = (i + Math.imul(y, ct)) | 0),
            (n = ((n = (n + Math.imul(y, dt)) | 0) + Math.imul(v, ct)) | 0),
            (a = (a + Math.imul(v, dt)) | 0);
          var kt =
            (((u + (i = (i + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(p, bt)) | 0) + Math.imul(b, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(b, bt)) | 0) + (n >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (i = Math.imul(L, H)),
            (n = ((n = Math.imul(L, W)) + Math.imul(K, H)) | 0),
            (a = Math.imul(K, W)),
            (i = (i + Math.imul(B, G)) | 0),
            (n = ((n = (n + Math.imul(B, X)) | 0) + Math.imul(O, G)) | 0),
            (a = (a + Math.imul(O, X)) | 0),
            (i = (i + Math.imul(I, $)) | 0),
            (n = ((n = (n + Math.imul(I, tt)) | 0) + Math.imul(N, $)) | 0),
            (a = (a + Math.imul(N, tt)) | 0),
            (i = (i + Math.imul(T, rt)) | 0),
            (n = ((n = (n + Math.imul(T, it)) | 0) + Math.imul(R, rt)) | 0),
            (a = (a + Math.imul(R, it)) | 0),
            (i = (i + Math.imul(k, at)) | 0),
            (n = ((n = (n + Math.imul(k, ot)) | 0) + Math.imul(z, at)) | 0),
            (a = (a + Math.imul(z, ot)) | 0),
            (i = (i + Math.imul(A, ft)) | 0),
            (n = ((n = (n + Math.imul(A, ut)) | 0) + Math.imul(x, ft)) | 0),
            (a = (a + Math.imul(x, ut)) | 0),
            (i = (i + Math.imul(w, ct)) | 0),
            (n = ((n = (n + Math.imul(w, dt)) | 0) + Math.imul(_, ct)) | 0),
            (a = (a + Math.imul(_, dt)) | 0);
          var zt =
            (((u + (i = (i + Math.imul(y, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(y, bt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(v, bt)) | 0) + (n >>> 13)) | 0) +
              (zt >>> 26)) |
            0),
            (zt &= 67108863),
            (i = Math.imul(L, G)),
            (n = ((n = Math.imul(L, X)) + Math.imul(K, G)) | 0),
            (a = Math.imul(K, X)),
            (i = (i + Math.imul(B, $)) | 0),
            (n = ((n = (n + Math.imul(B, tt)) | 0) + Math.imul(O, $)) | 0),
            (a = (a + Math.imul(O, tt)) | 0),
            (i = (i + Math.imul(I, rt)) | 0),
            (n = ((n = (n + Math.imul(I, it)) | 0) + Math.imul(N, rt)) | 0),
            (a = (a + Math.imul(N, it)) | 0),
            (i = (i + Math.imul(T, at)) | 0),
            (n = ((n = (n + Math.imul(T, ot)) | 0) + Math.imul(R, at)) | 0),
            (a = (a + Math.imul(R, ot)) | 0),
            (i = (i + Math.imul(k, ft)) | 0),
            (n = ((n = (n + Math.imul(k, ut)) | 0) + Math.imul(z, ft)) | 0),
            (a = (a + Math.imul(z, ut)) | 0),
            (i = (i + Math.imul(A, ct)) | 0),
            (n = ((n = (n + Math.imul(A, dt)) | 0) + Math.imul(x, ct)) | 0),
            (a = (a + Math.imul(x, dt)) | 0);
          var Et =
            (((u + (i = (i + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(w, bt)) | 0) + Math.imul(_, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(_, bt)) | 0) + (n >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (i = Math.imul(L, $)),
            (n = ((n = Math.imul(L, tt)) + Math.imul(K, $)) | 0),
            (a = Math.imul(K, tt)),
            (i = (i + Math.imul(B, rt)) | 0),
            (n = ((n = (n + Math.imul(B, it)) | 0) + Math.imul(O, rt)) | 0),
            (a = (a + Math.imul(O, it)) | 0),
            (i = (i + Math.imul(I, at)) | 0),
            (n = ((n = (n + Math.imul(I, ot)) | 0) + Math.imul(N, at)) | 0),
            (a = (a + Math.imul(N, ot)) | 0),
            (i = (i + Math.imul(T, ft)) | 0),
            (n = ((n = (n + Math.imul(T, ut)) | 0) + Math.imul(R, ft)) | 0),
            (a = (a + Math.imul(R, ut)) | 0),
            (i = (i + Math.imul(k, ct)) | 0),
            (n = ((n = (n + Math.imul(k, dt)) | 0) + Math.imul(z, ct)) | 0),
            (a = (a + Math.imul(z, dt)) | 0);
          var Tt =
            (((u + (i = (i + Math.imul(A, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(A, bt)) | 0) + Math.imul(x, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(x, bt)) | 0) + (n >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (i = Math.imul(L, rt)),
            (n = ((n = Math.imul(L, it)) + Math.imul(K, rt)) | 0),
            (a = Math.imul(K, it)),
            (i = (i + Math.imul(B, at)) | 0),
            (n = ((n = (n + Math.imul(B, ot)) | 0) + Math.imul(O, at)) | 0),
            (a = (a + Math.imul(O, ot)) | 0),
            (i = (i + Math.imul(I, ft)) | 0),
            (n = ((n = (n + Math.imul(I, ut)) | 0) + Math.imul(N, ft)) | 0),
            (a = (a + Math.imul(N, ut)) | 0),
            (i = (i + Math.imul(T, ct)) | 0),
            (n = ((n = (n + Math.imul(T, dt)) | 0) + Math.imul(R, ct)) | 0),
            (a = (a + Math.imul(R, dt)) | 0);
          var Rt =
            (((u + (i = (i + Math.imul(k, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(k, bt)) | 0) + Math.imul(z, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(z, bt)) | 0) + (n >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (i = Math.imul(L, at)),
            (n = ((n = Math.imul(L, ot)) + Math.imul(K, at)) | 0),
            (a = Math.imul(K, ot)),
            (i = (i + Math.imul(B, ft)) | 0),
            (n = ((n = (n + Math.imul(B, ut)) | 0) + Math.imul(O, ft)) | 0),
            (a = (a + Math.imul(O, ut)) | 0),
            (i = (i + Math.imul(I, ct)) | 0),
            (n = ((n = (n + Math.imul(I, dt)) | 0) + Math.imul(N, ct)) | 0),
            (a = (a + Math.imul(N, dt)) | 0);
          var Pt =
            (((u + (i = (i + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(T, bt)) | 0) + Math.imul(R, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(R, bt)) | 0) + (n >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863),
            (i = Math.imul(L, ft)),
            (n = ((n = Math.imul(L, ut)) + Math.imul(K, ft)) | 0),
            (a = Math.imul(K, ut)),
            (i = (i + Math.imul(B, ct)) | 0),
            (n = ((n = (n + Math.imul(B, dt)) | 0) + Math.imul(O, ct)) | 0),
            (a = (a + Math.imul(O, dt)) | 0);
          var It =
            (((u + (i = (i + Math.imul(I, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(I, bt)) | 0) + Math.imul(N, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(N, bt)) | 0) + (n >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (i = Math.imul(L, ct)),
            (n = ((n = Math.imul(L, dt)) + Math.imul(K, ct)) | 0),
            (a = Math.imul(K, dt));
          var Nt =
            (((u + (i = (i + Math.imul(B, pt)) | 0)) | 0) +
              ((8191 &
                (n =
                  ((n = (n + Math.imul(B, bt)) | 0) + Math.imul(O, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((a = (a + Math.imul(O, bt)) | 0) + (n >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863);
          var Ut =
            (((u + (i = Math.imul(L, pt))) | 0) +
              ((8191 & (n = ((n = Math.imul(L, bt)) + Math.imul(K, pt)) | 0)) <<
                13)) |
            0;
          return (
            (u =
              ((((a = Math.imul(K, bt)) + (n >>> 13)) | 0) + (Ut >>> 26)) | 0),
            (Ut &= 67108863),
            (f[0] = mt),
            (f[1] = yt),
            (f[2] = vt),
            (f[3] = gt),
            (f[4] = wt),
            (f[5] = _t),
            (f[6] = Mt),
            (f[7] = At),
            (f[8] = xt),
            (f[9] = St),
            (f[10] = kt),
            (f[11] = zt),
            (f[12] = Et),
            (f[13] = Tt),
            (f[14] = Rt),
            (f[15] = Pt),
            (f[16] = It),
            (f[17] = Nt),
            (f[18] = Ut),
            0 !== u && ((f[19] = u), r.length++),
            r
          );
        };
        function y(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var i = 0, n = 0, a = 0; a < r.length - 1; a++) {
            var o = n;
            n = 0;
            for (
              var s = 67108863 & i,
                f = Math.min(a, e.length - 1),
                u = Math.max(0, a - t.length + 1);
              u <= f;
              u++
            ) {
              var h = a - u,
                c = (0 | t.words[h]) * (0 | e.words[u]),
                d = 67108863 & c;
              (s = 67108863 & (d = (d + s) | 0)),
                (n +=
                  (o =
                    ((o = (o + ((c / 67108864) | 0)) | 0) + (d >>> 26)) | 0) >>>
                  26),
                (o &= 67108863);
            }
            (r.words[a] = s), (i = o), (o = n);
          }
          return 0 !== i ? (r.words[a] = i) : r.length--, r._strip();
        }
        function v(t, e, r) {
          return y(t, e, r);
        }
        function g(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (m = b),
          (a.prototype.mulTo = function (t, e) {
            var r = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? m(this, t, e)
              : r < 63
              ? b(this, t, e)
              : r < 1024
              ? y(this, t, e)
              : v(this, t, e);
          }),
          (g.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), r = a.prototype._countBits(t) - 1, i = 0;
              i < t;
              i++
            )
              e[i] = this.revBin(i, r, t);
            return e;
          }),
          (g.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var i = 0, n = 0; n < e; n++)
              (i |= (1 & t) << (e - n - 1)), (t >>= 1);
            return i;
          }),
          (g.prototype.permute = function (t, e, r, i, n, a) {
            for (var o = 0; o < a; o++) (i[o] = e[t[o]]), (n[o] = r[t[o]]);
          }),
          (g.prototype.transform = function (t, e, r, i, n, a) {
            this.permute(a, t, e, r, i, n);
            for (var o = 1; o < n; o <<= 1)
              for (
                var s = o << 1,
                  f = Math.cos((2 * Math.PI) / s),
                  u = Math.sin((2 * Math.PI) / s),
                  h = 0;
                h < n;
                h += s
              )
                for (var c = f, d = u, l = 0; l < o; l++) {
                  var p = r[h + l],
                    b = i[h + l],
                    m = r[h + l + o],
                    y = i[h + l + o],
                    v = c * m - d * y;
                  (y = c * y + d * m),
                    (m = v),
                    (r[h + l] = p + m),
                    (i[h + l] = b + y),
                    (r[h + l + o] = p - m),
                    (i[h + l + o] = b - y),
                    l !== s &&
                      ((v = f * c - u * d), (d = f * d + u * c), (c = v));
                }
          }),
          (g.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              i = 1 & r,
              n = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) n++;
            return 1 << (n + 1 + i);
          }),
          (g.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var i = 0; i < r / 2; i++) {
                var n = t[i];
                (t[i] = t[r - i - 1]),
                  (t[r - i - 1] = n),
                  (n = e[i]),
                  (e[i] = -e[r - i - 1]),
                  (e[r - i - 1] = -n);
              }
          }),
          (g.prototype.normalize13b = function (t, e) {
            for (var r = 0, i = 0; i < e / 2; i++) {
              var n =
                8192 * Math.round(t[2 * i + 1] / e) +
                Math.round(t[2 * i] / e) +
                r;
              (t[i] = 67108863 & n),
                (r = n < 67108864 ? 0 : (n / 67108864) | 0);
            }
            return t;
          }),
          (g.prototype.convert13b = function (t, e, r, n) {
            for (var a = 0, o = 0; o < e; o++)
              (a += 0 | t[o]),
                (r[2 * o] = 8191 & a),
                (a >>>= 13),
                (r[2 * o + 1] = 8191 & a),
                (a >>>= 13);
            for (o = 2 * e; o < n; ++o) r[o] = 0;
            i(0 === a), i(0 == (-8192 & a));
          }),
          (g.prototype.stub = function (t) {
            for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (g.prototype.mulp = function (t, e, r) {
            var i = 2 * this.guessLen13b(t.length, e.length),
              n = this.makeRBT(i),
              a = this.stub(i),
              o = new Array(i),
              s = new Array(i),
              f = new Array(i),
              u = new Array(i),
              h = new Array(i),
              c = new Array(i),
              d = r.words;
            (d.length = i),
              this.convert13b(t.words, t.length, o, i),
              this.convert13b(e.words, e.length, u, i),
              this.transform(o, a, s, f, i, n),
              this.transform(u, a, h, c, i, n);
            for (var l = 0; l < i; l++) {
              var p = s[l] * h[l] - f[l] * c[l];
              (f[l] = s[l] * c[l] + f[l] * h[l]), (s[l] = p);
            }
            return (
              this.conjugate(s, f, i),
              this.transform(s, f, d, a, i, n),
              this.conjugate(d, a, i),
              this.normalize13b(d, i),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r._strip()
            );
          }),
          (a.prototype.mul = function (t) {
            var e = new a(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (a.prototype.mulf = function (t) {
            var e = new a(null);
            return (e.words = new Array(this.length + t.length)), v(this, t, e);
          }),
          (a.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (a.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), i("number" == typeof t), i(t < 67108864);
            for (var r = 0, n = 0; n < this.length; n++) {
              var a = (0 | this.words[n]) * t,
                o = (67108863 & a) + (67108863 & r);
              (r >>= 26),
                (r += (a / 67108864) | 0),
                (r += o >>> 26),
                (this.words[n] = 67108863 & o);
            }
            return (
              0 !== r && ((this.words[n] = r), this.length++),
              e ? this.ineg() : this
            );
          }),
          (a.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (a.prototype.sqr = function () {
            return this.mul(this);
          }),
          (a.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (a.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
                var i = (r / 26) | 0,
                  n = r % 26;
                e[r] = (t.words[i] >>> n) & 1;
              }
              return e;
            })(t);
            if (0 === e.length) return new a(1);
            for (
              var r = this, i = 0;
              i < e.length && 0 === e[i];
              i++, r = r.sqr()
            );
            if (++i < e.length)
              for (var n = r.sqr(); i < e.length; i++, n = n.sqr())
                0 !== e[i] && (r = r.mul(n));
            return r;
          }),
          (a.prototype.iushln = function (t) {
            i("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              n = (t - r) / 26,
              a = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var o = 0;
              for (e = 0; e < this.length; e++) {
                var s = this.words[e] & a,
                  f = ((0 | this.words[e]) - s) << r;
                (this.words[e] = f | o), (o = s >>> (26 - r));
              }
              o && ((this.words[e] = o), this.length++);
            }
            if (0 !== n) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + n] = this.words[e];
              for (e = 0; e < n; e++) this.words[e] = 0;
              this.length += n;
            }
            return this._strip();
          }),
          (a.prototype.ishln = function (t) {
            return i(0 === this.negative), this.iushln(t);
          }),
          (a.prototype.iushrn = function (t, e, r) {
            var n;
            i("number" == typeof t && t >= 0),
              (n = e ? (e - (e % 26)) / 26 : 0);
            var a = t % 26,
              o = Math.min((t - a) / 26, this.length),
              s = 67108863 ^ ((67108863 >>> a) << a),
              f = r;
            if (((n -= o), (n = Math.max(0, n)), f)) {
              for (var u = 0; u < o; u++) f.words[u] = this.words[u];
              f.length = o;
            }
            if (0 === o);
            else if (this.length > o)
              for (this.length -= o, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + o];
            else (this.words[0] = 0), (this.length = 1);
            var h = 0;
            for (u = this.length - 1; u >= 0 && (0 !== h || u >= n); u--) {
              var c = 0 | this.words[u];
              (this.words[u] = (h << (26 - a)) | (c >>> a)), (h = c & s);
            }
            return (
              f && 0 !== h && (f.words[f.length++] = h),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (a.prototype.ishrn = function (t, e, r) {
            return i(0 === this.negative), this.iushrn(t, e, r);
          }),
          (a.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (a.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (a.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (a.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (a.prototype.testn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            return !(this.length <= r) && !!(this.words[r] & n);
          }),
          (a.prototype.imaskn = function (t) {
            i("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            if (
              (i(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= r)
            )
              return this;
            if (
              (0 !== e && r++,
              (this.length = Math.min(r, this.length)),
              0 !== e)
            ) {
              var n = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= n;
            }
            return this._strip();
          }),
          (a.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (a.prototype.iaddn = function (t) {
            return (
              i("number" == typeof t),
              i(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) <= t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (a.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (a.prototype.isubn = function (t) {
            if ((i("number" == typeof t), i(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (a.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (a.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (a.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (a.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (a.prototype._ishlnsubmul = function (t, e, r) {
            var n,
              a,
              o = t.length + r;
            this._expand(o);
            var s = 0;
            for (n = 0; n < t.length; n++) {
              a = (0 | this.words[n + r]) + s;
              var f = (0 | t.words[n]) * e;
              (s = ((a -= 67108863 & f) >> 26) - ((f / 67108864) | 0)),
                (this.words[n + r] = 67108863 & a);
            }
            for (; n < this.length - r; n++)
              (s = (a = (0 | this.words[n + r]) + s) >> 26),
                (this.words[n + r] = 67108863 & a);
            if (0 === s) return this._strip();
            for (i(-1 === s), s = 0, n = 0; n < this.length; n++)
              (s = (a = -(0 | this.words[n]) + s) >> 26),
                (this.words[n] = 67108863 & a);
            return (this.negative = 1), this._strip();
          }),
          (a.prototype._wordDiv = function (t, e) {
            var r = (this.length, t.length),
              i = this.clone(),
              n = t,
              o = 0 | n.words[n.length - 1];
            0 !== (r = 26 - this._countBits(o)) &&
              ((n = n.ushln(r)), i.iushln(r), (o = 0 | n.words[n.length - 1]));
            var s,
              f = i.length - n.length;
            if ("mod" !== e) {
              ((s = new a(null)).length = f + 1),
                (s.words = new Array(s.length));
              for (var u = 0; u < s.length; u++) s.words[u] = 0;
            }
            var h = i.clone()._ishlnsubmul(n, 1, f);
            0 === h.negative && ((i = h), s && (s.words[f] = 1));
            for (var c = f - 1; c >= 0; c--) {
              var d =
                67108864 * (0 | i.words[n.length + c]) +
                (0 | i.words[n.length + c - 1]);
              for (
                d = Math.min((d / o) | 0, 67108863), i._ishlnsubmul(n, d, c);
                0 !== i.negative;

              )
                d--,
                  (i.negative = 0),
                  i._ishlnsubmul(n, 1, c),
                  i.isZero() || (i.negative ^= 1);
              s && (s.words[c] = d);
            }
            return (
              s && s._strip(),
              i._strip(),
              "div" !== e && 0 !== r && i.iushrn(r),
              { div: s || null, mod: i }
            );
          }),
          (a.prototype.divmod = function (t, e, r) {
            return (
              i(!t.isZero()),
              this.isZero()
                ? { div: new a(0), mod: new a(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((s = this.neg().divmod(t, e)),
                  "mod" !== e && (n = s.div.neg()),
                  "div" !== e &&
                    ((o = s.mod.neg()), r && 0 !== o.negative && o.iadd(t)),
                  { div: n, mod: o })
                : 0 === this.negative && 0 !== t.negative
                ? ((s = this.divmod(t.neg(), e)),
                  "mod" !== e && (n = s.div.neg()),
                  { div: n, mod: s.mod })
                : 0 != (this.negative & t.negative)
                ? ((s = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((o = s.mod.neg()), r && 0 !== o.negative && o.isub(t)),
                  { div: s.div, mod: o })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new a(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new a(this.modrn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new a(this.modrn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var n, o, s;
          }),
          (a.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (a.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (a.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (a.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              i = t.ushrn(1),
              n = t.andln(1),
              a = r.cmp(i);
            return a < 0 || (1 === n && 0 === a)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (a.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 67108863);
            for (var r = (1 << 26) % t, n = 0, a = this.length - 1; a >= 0; a--)
              n = (r * n + (0 | this.words[a])) % t;
            return e ? -n : n;
          }),
          (a.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (a.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), i(t <= 67108863);
            for (var r = 0, n = this.length - 1; n >= 0; n--) {
              var a = (0 | this.words[n]) + 67108864 * r;
              (this.words[n] = (a / t) | 0), (r = a % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (a.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (a.prototype.egcd = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n = new a(1), o = new a(0), s = new a(0), f = new a(1), u = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++u;
            for (var h = r.clone(), c = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, l = 1;
                0 == (e.words[0] & l) && d < 26;
                ++d, l <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (n.isOdd() || o.isOdd()) && (n.iadd(h), o.isub(c)),
                    n.iushrn(1),
                    o.iushrn(1);
              for (
                var p = 0, b = 1;
                0 == (r.words[0] & b) && p < 26;
                ++p, b <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (s.isOdd() || f.isOdd()) && (s.iadd(h), f.isub(c)),
                    s.iushrn(1),
                    f.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), n.isub(s), o.isub(f))
                : (r.isub(e), s.isub(n), f.isub(o));
            }
            return { a: s, b: f, gcd: r.iushln(u) };
          }),
          (a.prototype._invmp = function (t) {
            i(0 === t.negative), i(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var n, o = new a(1), s = new a(0), f = r.clone();
              e.cmpn(1) > 0 && r.cmpn(1) > 0;

            ) {
              for (
                var u = 0, h = 1;
                0 == (e.words[0] & h) && u < 26;
                ++u, h <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; )
                  o.isOdd() && o.iadd(f), o.iushrn(1);
              for (
                var c = 0, d = 1;
                0 == (r.words[0] & d) && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (r.iushrn(c); c-- > 0; )
                  s.isOdd() && s.iadd(f), s.iushrn(1);
              e.cmp(r) >= 0 ? (e.isub(r), o.isub(s)) : (r.isub(e), s.isub(o));
            }
            return (n = 0 === e.cmpn(1) ? o : s).cmpn(0) < 0 && n.iadd(t), n;
          }),
          (a.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var i = 0; e.isEven() && r.isEven(); i++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var n = e.cmp(r);
              if (n < 0) {
                var a = e;
                (e = r), (r = a);
              } else if (0 === n || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(i);
          }),
          (a.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (a.prototype.isEven = function () {
            return 0 == (1 & this.words[0]);
          }),
          (a.prototype.isOdd = function () {
            return 1 == (1 & this.words[0]);
          }),
          (a.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (a.prototype.bincn = function (t) {
            i("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              n = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= n), this;
            for (var a = n, o = r; 0 !== a && o < this.length; o++) {
              var s = 0 | this.words[o];
              (a = (s += a) >>> 26), (s &= 67108863), (this.words[o] = s);
            }
            return 0 !== a && ((this.words[o] = a), this.length++), this;
          }),
          (a.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (a.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), i(t <= 67108863, "Number is too big");
              var n = 0 | this.words[0];
              e = n === t ? 0 : n < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (a.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (a.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var i = 0 | this.words[r],
                n = 0 | t.words[r];
              if (i !== n) {
                i < n ? (e = -1) : i > n && (e = 1);
                break;
              }
            }
            return e;
          }),
          (a.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (a.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (a.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (a.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (a.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (a.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (a.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (a.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (a.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (a.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (a.red = function (t) {
            return new k(t);
          }),
          (a.prototype.toRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              i(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (a.prototype.fromRed = function () {
            return (
              i(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (a.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (a.prototype.forceRed = function (t) {
            return (
              i(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (a.prototype.redAdd = function (t) {
            return (
              i(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (a.prototype.redIAdd = function (t) {
            return (
              i(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (a.prototype.redSub = function (t) {
            return (
              i(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (a.prototype.redISub = function (t) {
            return (
              i(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (a.prototype.redShl = function (t) {
            return (
              i(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (a.prototype.redMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (a.prototype.redIMul = function (t) {
            return (
              i(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (a.prototype.redSqr = function () {
            return (
              i(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (a.prototype.redISqr = function () {
            return (
              i(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (a.prototype.redSqrt = function () {
            return (
              i(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (a.prototype.redInvm = function () {
            return (
              i(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (a.prototype.redNeg = function () {
            return (
              i(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (a.prototype.redPow = function (t) {
            return (
              i(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var w = { k256: null, p224: null, p192: null, p25519: null };
        function _(t, e) {
          (this.name = t),
            (this.p = new a(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new a(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function M() {
          _.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function A() {
          _.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function x() {
          _.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function S() {
          _.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function k(t) {
          if ("string" == typeof t) {
            var e = a._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            i(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function z(t) {
          k.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new a(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (_.prototype._tmp = function () {
          var t = new a(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (_.prototype.ireduce = function (t) {
            var e,
              r = t;
            do {
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            } while (e > this.n);
            var i = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === i
                ? ((r.words[0] = 0), (r.length = 1))
                : i > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (_.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (_.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          n(M, _),
          (M.prototype.split = function (t, e) {
            for (var r = Math.min(t.length, 9), i = 0; i < r; i++)
              e.words[i] = t.words[i];
            if (((e.length = r), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var n = t.words[9];
            for (e.words[e.length++] = 4194303 & n, i = 10; i < t.length; i++) {
              var a = 0 | t.words[i];
              (t.words[i - 10] = ((4194303 & a) << 4) | (n >>> 22)), (n = a);
            }
            (n >>>= 22),
              (t.words[i - 10] = n),
              0 === n && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (M.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 0 | t.words[r];
              (e += 977 * i),
                (t.words[r] = 67108863 & e),
                (e = 64 * i + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          n(A, _),
          n(x, _),
          n(S, _),
          (S.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var i = 19 * (0 | t.words[r]) + e,
                n = 67108863 & i;
              (i >>>= 26), (t.words[r] = n), (e = i);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (a._prime = function (t) {
            if (w[t]) return w[t];
            var e;
            if ("k256" === t) e = new M();
            else if ("p224" === t) e = new A();
            else if ("p192" === t) e = new x();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new S();
            }
            return (w[t] = e), e;
          }),
          (k.prototype._verify1 = function (t) {
            i(0 === t.negative, "red works only with positives"),
              i(t.red, "red works only with red numbers");
          }),
          (k.prototype._verify2 = function (t, e) {
            i(0 == (t.negative | e.negative), "red works only with positives"),
              i(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (k.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (h(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (k.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (k.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (k.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (k.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
          }),
          (k.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return r.cmpn(0) < 0 && r.iadd(this.m), r;
          }),
          (k.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (k.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (k.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (k.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (k.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (k.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((i(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new a(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var n = this.m.subn(1), o = 0;
              !n.isZero() && 0 === n.andln(1);

            )
              o++, n.iushrn(1);
            i(!n.isZero());
            var s = new a(1).toRed(this),
              f = s.redNeg(),
              u = this.m.subn(1).iushrn(1),
              h = this.m.bitLength();
            for (
              h = new a(2 * h * h).toRed(this);
              0 !== this.pow(h, u).cmp(f);

            )
              h.redIAdd(f);
            for (
              var c = this.pow(h, n),
                d = this.pow(t, n.addn(1).iushrn(1)),
                l = this.pow(t, n),
                p = o;
              0 !== l.cmp(s);

            ) {
              for (var b = l, m = 0; 0 !== b.cmp(s); m++) b = b.redSqr();
              i(m < p);
              var y = this.pow(c, new a(1).iushln(p - m - 1));
              (d = d.redMul(y)), (c = y.redSqr()), (l = l.redMul(c)), (p = m);
            }
            return d;
          }),
          (k.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (k.prototype.pow = function (t, e) {
            if (e.isZero()) return new a(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = new Array(16);
            (r[0] = new a(1).toRed(this)), (r[1] = t);
            for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], t);
            var n = r[0],
              o = 0,
              s = 0,
              f = e.bitLength() % 26;
            for (0 === f && (f = 26), i = e.length - 1; i >= 0; i--) {
              for (var u = e.words[i], h = f - 1; h >= 0; h--) {
                var c = (u >> h) & 1;
                n !== r[0] && (n = this.sqr(n)),
                  0 !== c || 0 !== o
                    ? ((o <<= 1),
                      (o |= c),
                      (4 === ++s || (0 === i && 0 === h)) &&
                        ((n = this.mul(n, r[o])), (s = 0), (o = 0)))
                    : (s = 0);
              }
              f = 26;
            }
            return n;
          }),
          (k.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (k.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (a.mont = function (t) {
            return new z(t);
          }),
          n(z, k),
          (z.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (z.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (z.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              a = n;
            return (
              n.cmp(this.m) >= 0
                ? (a = n.isub(this.m))
                : n.cmpn(0) < 0 && (a = n.iadd(this.m)),
              a._forceRed(this)
            );
          }),
          (z.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new a(0)._forceRed(this);
            var r = t.mul(e),
              i = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              n = r.isub(i).iushrn(this.shift),
              o = n;
            return (
              n.cmp(this.m) >= 0
                ? (o = n.isub(this.m))
                : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (z.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })(t, this);
    }).call(this, r(19)(t));
  },
  function (t, e) {},
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__assign) ||
        function () {
          return (i =
            Object.assign ||
            function (t) {
              for (var e, r = 1, i = arguments.length; r < i; r++)
                for (var n in (e = arguments[r]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }).apply(this, arguments);
        },
      n =
        (this && this.__awaiter) ||
        function (t, e, r, i) {
          return new (r || (r = Promise))(function (n, a) {
            function o(t) {
              try {
                f(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                f(i.throw(t));
              } catch (t) {
                a(t);
              }
            }
            function f(t) {
              var e;
              t.done
                ? n(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(o, s);
            }
            f((i = i.apply(t, e || [])).next());
          });
        },
      a =
        (this && this.__generator) ||
        function (t, e) {
          var r,
            i,
            n,
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(s) {
            return function (f) {
              return (function (s) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; a && ((a = 0), s[0] && (o = 0)), o; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (n =
                          2 & s[0]
                            ? i.return
                            : s[0]
                            ? i.throw || ((n = i.return) && n.call(i), 0)
                            : i.next) &&
                        !(n = n.call(i, s[1])).done)
                    )
                      return n;
                    switch (((i = 0), n && (s = [2 & s[0], n.value]), s[0])) {
                      case 0:
                      case 1:
                        n = s;
                        break;
                      case 4:
                        return o.label++, { value: s[1], done: !1 };
                      case 5:
                        o.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !((n = o.trys),
                          (n = n.length > 0 && n[n.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0]))
                        ) {
                          o = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!n || (s[1] > n[0] && s[1] < n[3]))
                        ) {
                          o.label = s[1];
                          break;
                        }
                        if (6 === s[0] && o.label < n[1]) {
                          (o.label = n[1]), (n = s);
                          break;
                        }
                        if (n && o.label < n[2]) {
                          (o.label = n[2]), o.ops.push(s);
                          break;
                        }
                        n[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    s = e.call(t, o);
                  } catch (t) {
                    (s = [6, t]), (i = 0);
                  } finally {
                    r = n = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, f]);
            };
          }
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.WaxSigningApi = void 0);
    var o = r(62);
    function s() {
      return Math.floor(new Date().getTime());
    }
    var f = (function () {
      function t(t, e, r, i) {
        (this.waxSigningURL = t),
          (this.waxAutoSigningURL = e),
          (this.metricURL = r),
          (this.returnTempAccount = i),
          (this.waxEventSource = new o.WaxEventSource(t)),
          (this.metricURL = r),
          (this.returnTempAccount = i);
      }
      return (
        (t.prototype.logout = function () {
          this.user = null;
        }),
        (t.prototype.login = function () {
          return n(this, void 0, void 0, function () {
            return a(this, function (t) {
              switch (t.label) {
                case 0:
                  return this.user ? [3, 2] : [4, this.loginViaWindow()];
                case 1:
                  t.sent(), (t.label = 2);
                case 2:
                  if (this.user) return [2, this.user];
                  throw new Error("Login failed");
              }
            });
          });
        }),
        (t.prototype.tryAutologin = function () {
          return n(this, void 0, void 0, function () {
            return a(this, function (t) {
              switch (t.label) {
                case 0:
                  if (this.user) return [2, !0];
                  t.label = 1;
                case 1:
                  return t.trys.push([1, 3, , 4]), [4, this.loginViaEndpoint()];
                case 2:
                  return t.sent(), [2, !0];
                case 3:
                  return t.sent(), [2, !1];
                case 4:
                  return [2];
              }
            });
          });
        }),
        (t.prototype.prepareTransaction = function (t) {
          return n(this, void 0, void 0, function () {
            var e;
            return a(this, function (r) {
              switch (r.label) {
                case 0:
                  return this.canAutoSign(t)
                    ? [3, 2]
                    : ((e = this),
                      [
                        4,
                        this.waxEventSource.openPopup(
                          "".concat(
                            this.waxSigningURL,
                            "/cloud-wallet/signing/"
                          )
                        ),
                      ]);
                case 1:
                  (e.signingWindow = r.sent()), (r.label = 2);
                case 2:
                  return [2];
              }
            });
          });
        }),
        (t.prototype.metricLog = function (t, e, r) {
          return (
            void 0 === e && (e = 0),
            void 0 === r && (r = []),
            n(this, void 0, void 0, function () {
              var i;
              return a(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (
                      n.trys.push([0, 3, , 4]),
                      "" === this.metricURL
                        ? [3, 2]
                        : [
                            4,
                            fetch(this.metricURL, {
                              method: "POST",
                              headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                name: t,
                                value: e,
                                tags: r,
                              }),
                            }),
                          ]
                    );
                  case 1:
                    n.sent(), (n.label = 2);
                  case 2:
                    return [3, 4];
                  case 3:
                    return (i = n.sent()), console.debug(i), [3, 4];
                  case 4:
                    return [2];
                }
              });
            })
          );
        }),
        (t.prototype.signing = function (t, e, r, i) {
          return (
            void 0 === r && (r = !1),
            void 0 === i && (i = !0),
            n(this, void 0, void 0, function () {
              var n, o;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    if (!this.canAutoSign(t)) return [3, 5];
                    a.label = 1;
                  case 1:
                    return (
                      a.trys.push([1, 4, , 5]),
                      (n = s()),
                      [4, this.signViaEndpoint(e, r, i)]
                    );
                  case 2:
                    return (
                      (o = a.sent()),
                      [
                        4,
                        this.metricLog(
                          "waxjs.metric.auto_signing",
                          s() - n,
                          []
                        ),
                      ]
                    );
                  case 3:
                    return a.sent(), [2, o];
                  case 4:
                    return a.sent(), [3, 5];
                  case 5:
                    return [4, this.signViaWindow(e, this.signingWindow, r, i)];
                  case 6:
                    return [2, a.sent()];
                }
              });
            })
          );
        }),
        (t.prototype.proofWindow = function (t, e, r) {
          return n(this, void 0, void 0, function () {
            var i, n;
            return a(this, function (a) {
              switch (a.label) {
                case 0:
                  return (
                    (i = "".concat(this.waxSigningURL, "/cloud-wallet/verify")),
                    [
                      4,
                      this.waxEventSource.openEventSource(i, {
                        type: "VERIFY",
                        nonce: t,
                        proof_type: e,
                        description: r,
                      }),
                    ]
                  );
                case 1:
                  return (
                    (n = a.sent()),
                    [
                      2,
                      this.waxEventSource.onceEvent(
                        n,
                        this.waxSigningURL,
                        this.receiveVerfication.bind(this),
                        void 0
                      ),
                    ]
                  );
              }
            });
          });
        }),
        (t.prototype.loginViaWindow = function () {
          return n(this, void 0, void 0, function () {
            var t, e;
            return a(this, function (r) {
              switch (r.label) {
                case 0:
                  return (
                    (t = new URL(
                      "".concat(this.waxSigningURL, "/cloud-wallet/login/")
                    )),
                    this.returnTempAccount
                      ? (t.search = "returnTemp=true")
                      : (t.search = ""),
                    [4, this.waxEventSource.openEventSource(t.toString())]
                  );
                case 1:
                  return (
                    (e = r.sent()),
                    [
                      2,
                      this.waxEventSource.onceEvent(
                        e,
                        this.waxSigningURL,
                        this.receiveLogin.bind(this),
                        void 0
                      ),
                    ]
                  );
              }
            });
          });
        }),
        (t.prototype.loginViaEndpoint = function () {
          return n(this, void 0, void 0, function () {
            var t, e, r;
            return a(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (t = new URL("".concat(this.waxAutoSigningURL, "login"))),
                    this.returnTempAccount
                      ? (t.search = "returnTemp=true")
                      : (t.search = ""),
                    [
                      4,
                      fetch(t.toString(), {
                        credentials: "include",
                        method: "get",
                      }),
                    ]
                  );
                case 1:
                  if (!(e = i.sent()).ok)
                    throw new Error(
                      "Login Endpoint Error "
                        .concat(e.status, " ")
                        .concat(e.statusText)
                    );
                  return [4, e.json()];
                case 2:
                  if ((r = i.sent()).processed && r.processed.except)
                    throw new Error(r);
                  return [2, this.receiveLogin({ data: r })];
              }
            });
          });
        }),
        (t.prototype.signViaEndpoint = function (t, e, r) {
          return (
            void 0 === e && (e = !1),
            void 0 === r && (r = !0),
            n(this, void 0, void 0, function () {
              var i, n, o;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (
                      (i = new AbortController()),
                      setTimeout(function () {
                        return i.abort();
                      }, 5e3),
                      [
                        4,
                        fetch("".concat(this.waxAutoSigningURL, "signing"), {
                          body: JSON.stringify({
                            freeBandwidth: !e,
                            feeFallback: r,
                            transaction: Object.values(t),
                          }),
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          method: "POST",
                          signal: i.signal,
                        }),
                      ]
                    );
                  case 1:
                    if (!(n = a.sent()).ok)
                      throw (
                        ((this.whitelistedContracts = []),
                        new Error(
                          "Signing Endpoint Error "
                            .concat(n.status, " ")
                            .concat(n.statusText)
                        ))
                      );
                    return [4, n.json()];
                  case 2:
                    if ((o = a.sent()).processed && o.processed.except)
                      throw (
                        ((this.whitelistedContracts = []),
                        new Error(
                          "Error returned from signing endpoint: ".concat(
                            JSON.stringify(o)
                          )
                        ))
                      );
                    return [2, this.receiveSignatures({ data: o })];
                }
              });
            })
          );
        }),
        (t.prototype.receiveVerfication = function (t) {
          if ("DENY" === t.data.type)
            throw new Error("User Denied Verification");
          return i({}, t.data);
        }),
        (t.prototype.signViaWindow = function (t, e, r, i) {
          return (
            void 0 === r && (r = !1),
            void 0 === i && (i = !0),
            n(this, void 0, void 0, function () {
              var n, o;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return (
                      (n = s()),
                      [
                        4,
                        this.waxEventSource.openEventSource(
                          "".concat(
                            this.waxSigningURL,
                            "/cloud-wallet/signing/"
                          ),
                          {
                            startTime: n,
                            feeFallback: i,
                            freeBandwidth: !r,
                            transaction: t,
                            type: "TRANSACTION",
                          },
                          e
                        ),
                      ]
                    );
                  case 1:
                    return (
                      (o = a.sent()),
                      [
                        2,
                        this.waxEventSource.onceEvent(
                          o,
                          this.waxSigningURL,
                          this.receiveSignatures.bind(this),
                          "TX_SIGNED"
                        ),
                      ]
                    );
                }
              });
            })
          );
        }),
        (t.prototype.receiveLogin = function (t) {
          return n(this, void 0, void 0, function () {
            var e, r, i, n, o, s, f;
            return a(this, function (a) {
              if (
                ((e = t.data),
                (r = e.verified),
                (i = e.userAccount),
                (n = e.pubKeys),
                (o = e.whitelistedContracts),
                (s = e.isTemp),
                (f = e.createData),
                !r)
              )
                throw new Error("User declined to share their user account");
              if (!i || !n)
                throw new Error("User does not have a blockchain account");
              return (
                (this.whitelistedContracts = o || []),
                (this.user = { account: i, keys: n, isTemp: s, createData: f }),
                [2, !0]
              );
            });
          });
        }),
        (t.prototype.receiveSignatures = function (t) {
          return n(this, void 0, void 0, function () {
            var e, r, i, n, o, f;
            return a(this, function (a) {
              if ("TX_SIGNED" === t.data.type) {
                if (
                  ((e = t.data),
                  (r = e.verified),
                  (i = e.signatures),
                  (n = e.whitelistedContracts),
                  (o = e.serializedTransaction),
                  (f = e.startTime),
                  !r || !i)
                )
                  throw new Error("User declined to sign the transaction");
                return (
                  (this.whitelistedContracts = n || []),
                  f &&
                    f > 0 &&
                    this.metricLog(
                      "waxjs.metric.manual_sign_transaction_time",
                      s() - f,
                      []
                    ),
                  [2, { serializedTransaction: o, signatures: i }]
                );
              }
              throw new Error(
                "Unexpected response received when attempting signing: ".concat(
                  JSON.stringify(t.data)
                )
              );
            });
          });
        }),
        (t.prototype.canAutoSign = function (t) {
          var e = this,
            r = navigator.userAgent.toLowerCase();
          return (
            !(-1 === r.search("chrome") && r.search("safari") >= 0) &&
            !t.actions.find(function (t) {
              return !e.isWhitelisted(t);
            })
          );
        }),
        (t.prototype.isWhitelisted = function (t) {
          return !(
            !this.whitelistedContracts ||
            !this.whitelistedContracts.find(function (e) {
              return (
                e.contract === t.account &&
                ("eosio.token" !== t.account ||
                  "transfer" !== t.name ||
                  e.recipients.includes(t.data.to))
              );
            })
          );
        }),
        t
      );
    })();
    e.WaxSigningApi = f;
  },
  function (t, e, r) {
    "use strict";
    var i =
        (this && this.__awaiter) ||
        function (t, e, r, i) {
          return new (r || (r = Promise))(function (n, a) {
            function o(t) {
              try {
                f(i.next(t));
              } catch (t) {
                a(t);
              }
            }
            function s(t) {
              try {
                f(i.throw(t));
              } catch (t) {
                a(t);
              }
            }
            function f(t) {
              var e;
              t.done
                ? n(t.value)
                : ((e = t.value),
                  e instanceof r
                    ? e
                    : new r(function (t) {
                        t(e);
                      })).then(o, s);
            }
            f((i = i.apply(t, e || [])).next());
          });
        },
      n =
        (this && this.__generator) ||
        function (t, e) {
          var r,
            i,
            n,
            a,
            o = {
              label: 0,
              sent: function () {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (a = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (a[Symbol.iterator] = function () {
                return this;
              }),
            a
          );
          function s(s) {
            return function (f) {
              return (function (s) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; a && ((a = 0), s[0] && (o = 0)), o; )
                  try {
                    if (
                      ((r = 1),
                      i &&
                        (n =
                          2 & s[0]
                            ? i.return
                            : s[0]
                            ? i.throw || ((n = i.return) && n.call(i), 0)
                            : i.next) &&
                        !(n = n.call(i, s[1])).done)
                    )
                      return n;
                    switch (((i = 0), n && (s = [2 & s[0], n.value]), s[0])) {
                      case 0:
                      case 1:
                        n = s;
                        break;
                      case 4:
                        return o.label++, { value: s[1], done: !1 };
                      case 5:
                        o.label++, (i = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = o.ops.pop()), o.trys.pop();
                        continue;
                      default:
                        if (
                          !((n = o.trys),
                          (n = n.length > 0 && n[n.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0]))
                        ) {
                          o = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!n || (s[1] > n[0] && s[1] < n[3]))
                        ) {
                          o.label = s[1];
                          break;
                        }
                        if (6 === s[0] && o.label < n[1]) {
                          (o.label = n[1]), (n = s);
                          break;
                        }
                        if (n && o.label < n[2]) {
                          (o.label = n[2]), o.ops.push(s);
                          break;
                        }
                        n[2] && o.ops.pop(), o.trys.pop();
                        continue;
                    }
                    s = e.call(t, o);
                  } catch (t) {
                    (s = [6, t]), (i = 0);
                  } finally {
                    r = n = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, f]);
            };
          }
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.WaxEventSource = void 0);
    var a = (function () {
      function t(t) {
        var e = this;
        (this.waxSigningURL = t),
          (this.timeout = function () {
            return i(e, void 0, void 0, function () {
              return n(this, function (t) {
                return [
                  2,
                  new Promise(function (t, e) {
                    return setTimeout(function () {
                      return e(new Error("Timeout"));
                    }, 5e3);
                  }),
                ];
              });
            });
          }),
          (this.openEventSource = this.openEventSource.bind(this)),
          (this.onceEvent = this.onceEvent.bind(this));
      }
      return (
        (t.prototype.openPopup = function (t) {
          return i(this, void 0, void 0, function () {
            var e;
            return n(this, function (r) {
              switch (r.label) {
                case 0:
                  return [
                    4,
                    window.open(t, "WaxPopup", "height=800,width=600"),
                  ];
                case 1:
                  if ((e = r.sent())) return [2, e];
                  throw new Error("Unable to open popup window");
              }
            });
          });
        }),
        (t.prototype.openEventSource = function (t, e, r) {
          return i(this, void 0, void 0, function () {
            var a,
              o,
              s,
              f,
              u = this;
            return n(this, function (h) {
              switch (h.label) {
                case 0:
                  return r ? ((o = r), [3, 3]) : [3, 1];
                case 1:
                  return [4, this.openPopup(t)];
                case 2:
                  (o = h.sent()), (h.label = 3);
                case 3:
                  if (!(a = o))
                    throw new Error("Unable to open a popup window");
                  return void 0 === e
                    ? [2, a]
                    : ((s = function (t) {
                        return i(u, void 0, void 0, function () {
                          return n(this, function (r) {
                            return (
                              "READY" === t.data.type &&
                                a.postMessage(e, this.waxSigningURL),
                              [2]
                            );
                          });
                        });
                      }),
                      (f = this.onceEvent(a, this.waxSigningURL, s, "READY")),
                      [
                        4,
                        Promise.race([f, this.timeout()]).catch(function (t) {
                          if ("Timeout" !== t.message) throw t;
                          a.postMessage(e, u.waxSigningURL);
                        }),
                      ]);
                case 4:
                  return h.sent(), [2, a];
              }
            });
          });
        }),
        (t.prototype.onceEvent = function (t, e, r, a) {
          return i(this, void 0, void 0, function () {
            return n(this, function (o) {
              return [
                2,
                new Promise(function (o, s) {
                  var f = !1;
                  window.addEventListener(
                    "message",
                    function u(h) {
                      return i(this, void 0, void 0, function () {
                        var i, c;
                        return n(this, function (n) {
                          switch (n.label) {
                            case 0:
                              if (h.origin !== e) return [2];
                              if (h.source !== t) return [2];
                              if ("object" != typeof h.data) return [2];
                              if (a && (!h.data.type || h.data.type !== a))
                                return [2];
                              n.label = 1;
                            case 1:
                              return (
                                n.trys.push([1, 3, , 4]),
                                (f = !0),
                                (i = o),
                                [4, r(h)]
                              );
                            case 2:
                              return i.apply(void 0, [n.sent()]), [3, 4];
                            case 3:
                              return (c = n.sent()), (f = !0), s(c), [3, 4];
                            case 4:
                              return (
                                window.removeEventListener("message", u, !1),
                                [2]
                              );
                          }
                        });
                      });
                    },
                    !1
                  );
                  var u = setInterval(function () {
                    t.closed &&
                      !f &&
                      (clearInterval(u), s("user closed the window"));
                  }, 1e3);
                }),
              ];
            });
          });
        }),
        t
      );
    })();
    e.WaxEventSource = a;
  },
]);
