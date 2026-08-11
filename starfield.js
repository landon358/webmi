/* WebMI starfield + grain + refraction filter.
   Canvas engine extracted VERBATIM from squarespace/footer-code-injection.html;
   sprites from header-code-injection.html. Do not hand-edit the engine. */

  window.WM_GALAXY_URLS = [
    'data:image/webp;base64,UklGRuwEAABXRUJQVlA4WAoAAAAgAAAAZQAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg/gIAAJAWAJ0BKmYAgAA+lUaeSqWjoqIoFbnosBKJZwDWUXgg4SR12Pdxnn6c3yW+iI6q8f0XQRho+/D8zSMjtqqqPZ5gk+yXC9hE+iGOrjp1FUGM3ZfrMAoYM/vi9GAD0V11fHHbdEFoYQ5q0CIo8fzTX6gVN3beXvaDThFzy74iJe+LLPqvneRe8dSbZreP/ZxuEhp5QgKfsQlmiJGhQZVq+/sv1hf33pc+4G9kaLc890Od/VPyNuSNHh8h+sfY4AD++teH7mj4spqgjxcduTOJLSuZsICFGQcCvVSdcFjO4lQ8YnilPYBz4Dz3sVO3AnBmbQuJju2MAEJ+AgKJTla5HxfOrhAkDBAL899mVy0ynZVc+WHVMOgXGn6p4OG0AlTMl5Qbj7Tt8+5psHhjNOQNnPcci2z4+oIYDJfAVOaTRca8pNH1zrXToP7TVjqXmrTWSxDgGNRUwd2TnghJYPyzm1wKcuTkdJ9ksDKxY5sATMdXztzV+WBaPfCgwxPVJ8HAcuYM4LUO9PBfWAXUPS82bmHgiaRGxtATyo1yVjd0dACDJUdl+fybr11sj+xo8LTJvl/AFIphqXcbx+u0qDtj/1ljKrjaCddkOztJUEh8CbIUTSZfapKvq0m5HJS7VuZEc43Xfg000dGgvtkbvt4sWt7r/A69Z0diH+5LboAyjy22CVwKITQoU/EK9vfsM4+tLsNe69jxnf8rMaYNLAlJPsq6dJRCWgpnHd6+JzcgOR84ReVtI4/rHS9vbHUri1LwyI9TLaNFWxgXKbaymOCaklhhfFEHvyEgH4q5fa4+FPOYfroLw8cfzplIwcKZmBthXnUvn25tTb4vLNqtUg/+yv4zDkdVn5cPPGlpaoRF/LCmiMKgc+MfteUw7/OUM6HdsJxQ68ggO8iHSM457ZH4jEyqtSILRMIsxyA4pt8TVhIWQu6SvrIqZM2n4n13/iI4ooetDIOymxuQ3Ty8HFyiXJptZDWz6FLtIpW+4st2++jI4HQCTCq+x9uSMAAAAAA=',
    'data:image/webp;base64,UklGRv4DAABXRUJQVlA4WAoAAAAgAAAAfAAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggEAIAAFARAJ0BKn0AgAA+lUidSyWkJiGoFQlYwBKJZwBYCgqj6Qe/7Uv1T/hROGoVDN4PninKJ76QWXKOLhY2TInKGTPQ7kMCTwm5GHFJ7GPrnJnPwFI7xBkMqyVLJfZN9+2Wd7yR6456DzGerh93nFmLVk+dThfwFWYXoUm9Ypn6+hJM+Ddu2m/3lfVbRdEaPyDwr4aoAAD++0ABF2d4D7hoTzQCXXE9B5vB88Nx4Ln+NJ6OIlXabdEiOd4n1jVoXQxgztBpvOrCy74UAB32o1agNmJDts/EbbO8I7Io3MkNXOUEvqgdc6GkJx9VZPlt9HDuSBx9MRAqJBNpxdeA2ndg18WeNXVSDVBQXvZ7KeL+UrSb9rRpFV9e4Xvipgb+UTX8JKCJu9LEhrmPIIZQi1KUT6TsqJn5K6o0sInsEAyLSB8hwacGRbMCqlggfRputk4LcovYNZ6boIMhIZdif1UH0AUGIe2bPDChwN1PbOslXcDM0oWG7CSuD1R8XwHdR0n+8V+la0dksFjKoKYmJUNojAtBLykrPcdr6VX1QFVYk5nMuX4n4LSo+oKitu5McR7u6zpRX2y2y/0mfneGk6RE3T7bGO20FyRgfrcRalmkNbZdAD/jQxekB65DURXWO9CKoeU4VUlq5KVmIShSMiF2Z7VzxjixD6f6pt+oq1HJ3PWAiybyJFZGZQLS/EDucgAAAA==',
    'data:image/webp;base64,UklGRrQEAABXRUJQVlA4WAoAAAAgAAAArgAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggxgIAALAUAJ0BKq8AgAA+lUieS6WkIqKl1QmQsBKJaQDV9d/fjghFygdy2jalaxLIFOI2GJYPWhXSDYLQWTUScESq1RW3d9eS2cxpBEyYSyv4eX3M5+ZgyiwRkVt1/sGPjrnSLdByRFDAZOdPAcHSISrNbNdWsHqW7c4VYOTgKEFKaB8mqhyx8LYbjDhN1cER3eIYmyGP6EEAhTBfgoCBOaCQ+WaEjr8unmRhdL8KSbaEAAD++teATgtNlxsoAr/tX/cPfgwwJJVu/BH0itcl4v13LMGiMIYNtszZopFBNUK79goOAXKHfXHJrumyTCRIbxnJ7fnNWB3/DnR6ua8mLqq4EATynPaeB/YfctzVcOWjWWA+CMQLqHy3VHb8VolCAMp9FjDnlcGgz11y6K4vWNzpJdThTH1Jc3Y/4SNsqKJM8sU2RODntE0Ca0RfQnbNGMsO7s6blN76/ckC1ulssEwHdpKuvKK20PXa08LGpcBJ4aOLYSQjVGBKkRsmDNCY1UKJK60dG6nYj5e/bCMIoVTa5m9cCtvLknEYJ1XpMWcyAdAwaLcpWzIVqQtqJZe1JtM+y7qQOGYb8A+2Yo46S7fltB1dK54AlSfaZQM+grRfsczHfJG7BmNf6y8tLlROeiPwXbfgwyAm+g2u8E7HhMJXMFi/DG15G62yj3+ugv6uiwiqwtNbifNVRYGBPz41sPhkIG1VQPHc/EcLhH5zKRZ9lL76xFhLlStmhVQW1fWiqCHIaFRMj9z8mENymxaG+upqYI78DdN8OrU98BU4TW12xiBj/mu5EPjbIBlwSxAMn3l113cWzSri5SoUYi7yBKBepTpJx9hUgeoJbY9JgR9KlU9wmrDHKT5EKpXTtNU2awEN3+V5/aoZvdsZL6yaG8Qi8n+cuJvANa18PZtHwSu8OA9KvBsrLISf5EXszVsAAzYbel4RIAAA',
    'data:image/webp;base64,UklGRpIFAABXRUJQVlA4WAoAAAAgAAAAwQAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggpAMAALAbAJ0BKsIAgAA+lUadS6WjoqUncrlosBKJaUR4UAAzMm+bvm8ekpKxoc6Dcc6vycL9jih1LGefhHG1Vb88wXya66AKMPrcX04d44xi+j9WCDTUd39WI8hriDZeC6ZR1Fo6uyDbZ7jNNOLkJmCvSj0EVJYIG+Z3yj69xzseFxuPQDQm2EOs2lKLVqDcz3DdU8m2Wwwoq2S7Hr6fII887/orYVVB9xcllu87hHKKCq4dwSiSDF3JSL7FCG4XB1WWHdQjjNbhtC8dXoNzoCa3v8IASv9bhmgONzbG1+qv74AIo/JyzaggAP6+emuLARqssyMP7TZQcfM+7lRhMzLRNGh7PbboPtddNEZSJhyhQ6oic4Q6xtcA5aiomuAzVnTHMYsw51pYk8raQfh6msJn2Y30HEU6x7183IK+jkTqZjiuG7wRWRYC0mrm5CAFF+hGWofvDdAL1r2Avne8ISI2cDCUjvNcZuQJpD9EXDDgxrKt2rL/raGwdH+cbMqQV70GncaR2R0no62ue4z+mMCgFWt/I2vuJgjbfiwrpw4FfRDJWy1TJvk2rNlVdOYozM3hdIsJHm7DEdE6tzE7kAnjWMyE6D1L4advcUbuDTwJzgaDE1W2swtRxYg0SOxvzEWQKMv1Y5uwXt9LStNG+sFzl6ADgCYMGodnJGoJmtV9yuuJEPOcMqiHcsed04JVY7nHnvQu7naF2ufrEA/Svq0ffNrC4wbYp5eM3oZZaEC3Cc+ndJ6CfjTiUaDex41f00nUSKX6Dyf9UT6BHFVZpCzNNdLXK8t6ZFGRGVjCu4Ouvx5qB2fC05KMhQWyu59GeaHhaAtBWIhB7D1jIkpg1YXn6YXSrPvWOa1mEqGi7NbvITdAcY2yBCegW0+bATAY+crvEr7srXWVhMXJe4F5Z1ZSqRy3sR/uzeE4S8UXwuXxxsHqChUke7zwXZJP2tWHLX71evXg1Ip9PCfvIppbFxEBZTxln0NOVBHAZ+GMJ+mlLelCOjs5FwsAbXSRD+H5WBJ4YkDp4X2+vu8FOTKFgBX/seYQh7GyJ+xBj+t+gEDpLK5d/iTrhJ67Lo2LwpGPqo4oZS6U+83KTSB12LAz9+cgQLCiJbH+tdevzQ0713QCKzGETnbxKGCeLkuYhuBEqoW4TFQdSQVmDtShYNHftjkOX9/RAi9+uLHXCQm+/0H1bUQLhk+eZ/XJ6yLPirCqqS/Xdjy1WCXUMGZyoXzAix7lYAAAAAAA',
    'data:image/webp;base64,UklGRvQEAABXRUJQVlA4WAoAAAAgAAAAlgAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggBgMAALAfAJ0BKpcAgAA+lUSeSiWjoyGodtqQsBKJZwhwAZZ9cIOHDhkJaC9m8j4iMg6ja9E3mLyaQUZzWryITMgN61XNPlgCbl2K4fLb8v6Lw7LfXucmkHZHioaO6yOhmJ+wVmKVSXw/wQib10FIz9NOJJvGG95KwfRYIUFvXfAdDEOkbdzxbwy0b9g2TlaYyGpY+F/bDnlTfiGf3uxEoWRdJfIsdDUNYwPeYFjUwYZ+66hAMLsyHGXsB8Hs0KQuKLf/+E83MzhGZkXtWNznwe5UBolhjtAu6j0Nimtx5R1kXAYB86XZNeKKcvOFrHkm+PJ/XBwqhQcse/IDVQfTqQ7OKTHrDKYupNAA/rj6P8IzvFUgkbogWX7WnfFenwl07XET8n972I97Su/qEoxDJ3uH3azGhkEvi9J81lQi6dBxbX14TscrZTtRUSHOhDcDcAU4gq5hOe96Q7/bspzo23fKoaZmv6TDgwT+cBPmjHbdK5UWzkr701sTHfFB0kehG2iqyDehgVuBVFCfm2d89HV3yRwZAo16N5WkrskNd0qPe6lR0j9fiRkDU8Xlsl8kNEMyeLvUoytCB1AIwbzmfFXaJ5c+6OsZfSC3AmWO304UQGoRZKZ85F0htM3rEqWvbzCMac3EZXwIpCqEQ4v2DVcOqA2EHI9P4j0yNxvz3NfbMArJVvkx1vmbtbj5Bg7/AFetFUoBbBWlYToUqUut31MMVWk8nRnggFIEXWQJMXsnSwgBx7gr1q6ZHFpk41MCR8TVZE/sO28v715mAN8q22YI9ta29gAcaY11QegQKG9J5K3muQi2rBtmNUcNxlpc4cg1g/M3gcicPECYL9BlRZplNoum2fLc31bBnputp2XvOoznQP8EKu98UmyX24eq3ajfZJWik9usDmRvYus9ymEFe3cse9Joj5q4BgF9TK+Y4+e0O0U7xGXxQiT6twc/YG8AZSWNj1MiXa+3AHMVNVyuSsJCgZZmwvgHDuXPjcNt4cG0ggl2g6kEX7SVYwChFzu3pPOpgAAAAA=='
  ];
  window.WM_GALAXY_URLS_COLOR = [
    'data:image/webp;base64,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',
    'data:image/webp;base64,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',
    'data:image/webp;base64,UklGRmAHAABXRUJQVlA4WAoAAAAgAAAA4gAAfwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggcgUAALAjAJ0BKuMAgAA+lUifTCWkIqIkEin4sBKJZwDWHV5mOLmf5DVfAQx5Y/nuWmQKQUQkd6MlVPefx2h4dw1tJMiR9HdI+cL8szCr2bl2k2Ry05qzQ1G/TVs+06rfwE2U96Yh/eX/kZH+JDWocDphlZkDDShLwG6+mzjCXGI1s5TmBxKo5MdOlQbJZRKZXHF+wJnHirnkwt2HhEn2Ae5P/l251qUE/M3/pnF914LwcxbYfC7CDN01mg4XguuK/34kZutx6JPejb6+HQJTLpZLc0rMLFnqjCl4q+zu5dL9OAkkBqj5C3tid0rcSP7tEJY2s++Z7lskahNAel+zfJ6nTsJ2OnkEgnL4tLDSrQHDJAUxml8AGUNXiLy4MOfdXbBHwUMvg6boAAD++nhA7faJMqozA/Wzqo/NmjkzbtzUjPovUo+UQ9BrdEZeAn0tIuVWL1uYEGZgcBhguTLiNsAh3fovJZ/F9W3mE8kfCf65eYSUwCczaYmAWK8zTEEJ5wjrTnqEoHE9nTV3hSmPZTNP3bWVicEymgP+cNEEvbRgAf9+RJA/mDJMS7jfHiRa/wQ6mJKylgCXwOWV3ZO8mOZ/yP98iGGZD2Hj5eOQeASztbrHWtoEV2cfwpi/UtByLEs9HAPWjZYZ0BDtisE/lKJ/pa95cv5iBmQDaHC6aFVImdf4ae6xC52NxN9EHzmiXxR2+1N/QhZuIKDUijv2AAABNnyam2ZDj+OndbqWt91y2EbVmcVmo+cqqCPGWvFEf82cCVXXYOnrhXkROiqEuK1l8AFOjuCE94bgrc6wVLRBJNCpIAwtLInG+o9iIMHPVhtGwfTptN9xMl/YLfezCNo9uK05tVB77iT48vOo9iLjahBoXySg53ULbfc12IDsc2BVORHDzJy6qw+TlDgIrkDUdPD6x95+PcJT3HJ3aAS7Eei6vjrXSniOMyOECYKff83Z6d+zAIZeuHM/w0nXcrnoM6R+2zNsCZkItOZej4Es6XOReOCXUYzzqqgfkSo+qfYFcXe0vI4TdBtoXkjptjdn+ssVtj+4Bv9XZ6lagULEPRZpkqZSX37B/DH5AmNzo/WPF+HpJj052HY1t/TDnCevEOk4FJWo+DgaRpp/A/Eclu/oncF+ghvPurJQbi8OFAb+5hyjQdxdueVi9qj/Y10SyizsAVJoY45TAfgMuQpS+YO+A9Kf1V26SenGo3yeKK48GiwANvnKQx54LCEqwAxuSomB+xaYGOGJOfZI3ApVhUXhRqilRsEIfpldoKA8iagmd3uOj7pYCN8ITJkrqnVy4wlJ6yVj553ARDuhzbU9Nlsf15jmCKukmyU4GLWaq29d7jNrGl0FpbYKE/EhKsu8Aol4zE5ygBmSR4D4EfOH1OMv6ydAWjehXSu8LlLJ2ftlzswasiLHRtnXgSXUMYIhaA89eMsSPIThA+AWMSM3ZBuOsXXgr1g7Aa21bGbu7WxLyZd3AkCrUkZfUZAA+iwXTo7HGaE7f+SZS+rDboUqL45sd7KVgcxhFCyZEXWYvRSWiPYhEH1IBAx5mG+VUtK/qTGvn++05INb9Zv0ZT1FBvxTLVV+9LzTEZhO6zlhYWj630bBcBmxUY9vfGvKM3zlzd/9XDjYv+KhSb24MEfSP+nxfDA9duFoDeaFm5gNPxcFYmq0/4W2mCCzdsEUop290MR/HjTNoLqexb9syUGE1NU3OBgP5UsEtTW62LoaoK/zUX8hS90Gci6/SbR7XEoVHOmkSlojoJu5HBGjo5o8OTFCXMEY3rTPfEMxgc6IBfCDtEZvbVg6JdZI5WePInLrv8DlBZTA15hVXb6c++uby5yhm6M9RSMMSB6q7kuABVK94AAA',
    'data:image/webp;base64,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'
  ];
  window.WM_ROCKET_URL = 'data:image/webp;base64,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';

(function init(){
  if (window.__wmStarfieldInit) return; window.__wmStarfieldInit = true;
  if (!document.body) { window.__wmStarfieldInit = false; return document.addEventListener('DOMContentLoaded', init); }
  var st = document.createElement('style');
  st.textContent = "\n.wm-grain{position:fixed;inset:-40px;z-index:1;pointer-events:none;opacity:0.032;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");will-change:transform;animation:wm-grain-shift 7s steps(6) infinite;}\n@keyframes wm-grain-shift{0%{transform:translate3d(0,0,0)}20%{transform:translate3d(-12px,8px,0)}40%{transform:translate3d(9px,-13px,0)}60%{transform:translate3d(-8px,-9px,0)}80%{transform:translate3d(13px,5px,0)}100%{transform:translate3d(0,0,0)}}\n@media (prefers-reduced-motion: reduce){.wm-grain{animation:none}}\nhtml{scrollbar-gutter:stable}\nbody{background:#0b0b0d;overflow-x:hidden;margin:0}\n";
  document.head.appendChild(st);
  var bg = document.createElement('div');
  bg.id = 'webmi-bg';
  bg.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;background:#000;overflow:hidden;';
  document.body.prepend(bg);
  var grain = document.createElement('div');
  grain.className = 'wm-grain'; grain.setAttribute('aria-hidden','true');
  document.body.appendChild(grain);
  var wrap = document.createElement('div');
  wrap.innerHTML = "<svg width=\"0\" height=\"0\" aria-hidden=\"true\" focusable=\"false\" style=\"position:absolute;width:0;height:0;overflow:hidden;\"><filter id=\"wm-refract\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\" color-interpolation-filters=\"sRGB\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.006 0.011\" numOctaves=\"2\" seed=\"7\" result=\"noise\"/><feGaussianBlur in=\"noise\" stdDeviation=\"3.2\" result=\"softNoise\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"softNoise\" scale=\"22\" xChannelSelector=\"R\" yChannelSelector=\"G\"/></filter></svg>";
  document.body.appendChild(wrap.firstElementChild);

(function () {
  var host = document.getElementById('webmi-bg');
  if (!host) return;
  var cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  host.appendChild(cv);
  var ctx = cv.getContext('2d');
  var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  var W = 0, H = 0, dw = 0, dh = 0;
  var sky = null, stars = [], bright = [], hazes = [], shots = [];
  var nextShot = 4, tPrev = 0, running = true, rafId = 0, scrollCur = 0;
  var DENS = window.WM_STAR_DENSITY || 3, mw = null, mwL = 0, mwW = 0; // DENS: star density multiplier
  var tier = 0, baseDens = DENS, gvN = 0, gvT = 0, gvWait = 4; // FPS governor: steps quality down on weak devices
  var panOX = 0, panOY = 0, panVX = 0, panVY = 0, panTX = 0, panTY = 0; // camera pan (page-travel transitions)
  var galImgs = [], galImgsC = [], galaxies = [], colorStars = [], tint = null, colEls = null, cf = 0;
  var isHome = /home[^\/]*$/i.test(location.pathname);
  var INTRO_D = 5.5, THETA = 1.5, introT = 0, intro = isHome; // star-trail spin-in, home only
  try {
    var __tv = JSON.parse(sessionStorage.getItem('wmTravel') || 'null');
    if (__tv && Date.now() - __tv.ts < 6000) { panVX = __tv.dx * 1100; panVY = __tv.dy * 900; intro = false; }
    var __pp = JSON.parse(sessionStorage.getItem('wmPanPos') || 'null');
    if (__pp && Date.now() - __pp.ts < 6000) { panOX = __pp.x || 0; panOY = __pp.y || 0; } // resume the exact camera offset from the previous page
    sessionStorage.removeItem('wmPanPos');
  } catch (e0) {}
  window.addEventListener('wm:pan', function (e) {
    panTX = (e.detail && e.detail.vx) || 0; panTY = (e.detail && e.detail.vy) || 0;
  });
  window.addEventListener('pagehide', function () { // stash the final pan offset as the page leaves
    try { sessionStorage.setItem('wmPanPos', JSON.stringify({ x: panOX, y: panOY, ts: Date.now() })); } catch (e3) {}
  });
  var GAL_URLS = window.WM_GALAXY_URLS || ['assets/galaxy-1.png','assets/galaxy-2.png','assets/galaxy-3.png','assets/galaxy-4.png','assets/galaxy-5.png'];
  GAL_URLS.forEach(function (u) {
    var im = new Image();
    im.onload = function () { galImgs.push(im); buildGalaxies(); };
    im.src = u;
  });
  var GAL_URLS_C = window.WM_GALAXY_URLS_COLOR || ['assets/galaxy-6.png','assets/galaxy-8.png','assets/galaxy-9.png','assets/galaxy-10.png'];
  GAL_URLS_C.forEach(function (u) {
    var im = new Image();
    im.onload = function () { galImgsC.push(im); buildGalaxies(); };
    im.src = u;
  });
  var reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !!(navigator.connection && navigator.connection.saveData);
  var COLS = ['242,244,248','242,244,248','242,244,248','242,244,248','242,244,248','242,244,248','214,226,252','214,226,252','255,236,214'];
  var seedState = 1;
  function reseed(n) { seedState = n >>> 0; }
  function srandom() { seedState = (seedState * 1664525 + 1013904223) >>> 0; return seedState / 4294967296; } // seeded: identical star/galaxy field on every load
  function rand(a, b) { return a + srandom() * (b - a); }
  function pick(a) { return a[(srandom() * a.length) | 0]; }

  function buildSky() {
    sky = document.createElement('canvas'); sky.width = dw; sky.height = dh;
    var c = sky.getContext('2d');
    var g = c.createLinearGradient(0, 0, 0, dh);
    g.addColorStop(0, '#010102'); g.addColorStop(0.55, '#030304'); g.addColorStop(1, '#050406');
    c.fillStyle = g; c.fillRect(0, 0, dw, dh);
    function blotch(x, y, r, col) {
      var b = c.createRadialGradient(x, y, 0, x, y, r);
      b.addColorStop(0, col); b.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = b; c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fill();
    }
    blotch(dw * 0.42, dh * 0.58, dh * 0.55, 'rgba(64,26,24,0.045)');
    blotch(dw * 0.78, dh * 0.28, dh * 0.45, 'rgba(46,54,88,0.035)');
    blotch(dw * 0.16, dh * 0.2, dh * 0.4, 'rgba(44,34,52,0.03)');
    var ag = c.createLinearGradient(0, dh * 0.9, 0, dh);
    ag.addColorStop(0, 'rgba(96,98,52,0)'); ag.addColorStop(1, 'rgba(96,98,52,0.05)');
    c.fillStyle = ag; c.fillRect(0, dh * 0.9, dw, dh * 0.1);
  }

  function buildStars() {
    reseed(1123581321); stars = []; bright = [];
    var n = Math.max(200, Math.min(12000, Math.round(W * H / 1100 * DENS)));
    for (var i = 0; i < n; i++) {
      var big = srandom() < 0.025;
      var depth = rand(0.15, 1);
      var s = {
        x: srandom() * dw, y: srandom() * dh,
        r: (big ? rand(1.1, 1.9) : (srandom() < 0.82 ? rand(0.3, 0.9) : rand(0.9, 1.4))) * DPR,
        base: big ? rand(0.65, 1) : 0.18 + 0.72 * srandom() * srandom(),
        sp: rand(0.6, 2.6), ph: rand(0, 6.28),
        sp2: rand(3, 7), ph2: rand(0, 6.28),
        scin: srandom() < 0.3,
        depth: depth, par: 0.06 + depth * depth * 0.62,
        col: big && srandom() < 0.18 ? '255,196,150' : pick(COLS)
      };
      (big ? bright : stars).push(s);
    }
    colorStars = [];
    var CPAL = ['255,120,90','255,165,70','255,95,65','120,185,255','110,230,215','255,225,160','235,240,255','200,140,255'];
    var cn = tier >= 2 ? 0 : Math.round(n * 1.8);
    for (i = 0; i < cn; i++) {
      colorStars.push({
        x: srandom() * dw, y: srandom() * dh,
        r: rand(0.35, 1.7) * DPR,
        base: 0.2 + 0.75 * srandom() * srandom(),
        sp: rand(0.6, 2.6), ph: rand(0, 6.28),
        par: 0.06 + Math.pow(rand(0.15, 1), 2) * 0.62,
        col: CPAL[(srandom() * CPAL.length) | 0]
      });
    }
  }

  function buildGalaxies() {
    galaxies = [];
    if (!dw) return;
    reseed(271828183);
    var i, im, h;
    for (i = 0; i < 5 && galImgs.length; i++) {
      im = galImgs[i % galImgs.length];
      h = rand(24, 54) * DPR;
      galaxies.push({
        im: im, h: h, w: h * (im.width / im.height),
        x: rand(0.06, 0.94) * dw, wy: rand(1.05, 4.3) * dh,
        par: rand(0.25, 0.55), alpha: rand(0.28, 0.5), rot: rand(0, 6.2832)
      });
    }
    // colourful set — larger, and biased toward the lower reaches of the page
    for (i = 0; i < 3 && galImgsC.length; i++) {
      im = galImgsC[i % galImgsC.length];
      h = rand(34, 70) * DPR;
      galaxies.push({
        im: im, h: h, w: h * (im.width / im.height),
        x: rand(0.06, 0.94) * dw, wy: rand(2.3, 4.6) * dh,
        par: rand(0.25, 0.55), alpha: rand(0.32, 0.55), rot: rand(0, 6.2832)
      });
    }
  }

  function buildTint() {
    tint = document.createElement('canvas'); tint.width = dw; tint.height = dh;
    var c = tint.getContext('2d');
    function blotch(x, y, r, col) {
      var g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fill();
    }
    blotch(dw * 0.25, dh * 0.75, dh * 0.7, 'rgba(150,72,45,0.2)');
    blotch(dw * 0.8, dh * 0.25, dh * 0.6, 'rgba(45,110,128,0.17)');
    blotch(dw * 0.6, dh * 0.6, dh * 0.5, 'rgba(140,70,130,0.12)');
    blotch(dw * 0.1, dh * 0.2, dh * 0.45, 'rgba(60,80,150,0.08)');
  }

  function buildMilkyWay() {
    reseed(314159265); mwL = Math.round(dw * 1.6); mwW = Math.round(dh * 0.6);
    mw = document.createElement('canvas'); mw.width = mwL; mw.height = mwW;
    var c = mw.getContext('2d');
    var ccx = mwL * 0.42, ccy = mwW * 0.5, i;
    function blob(x, y, rx, ry, col) {
      c.save(); c.translate(x, y); c.scale(rx / ry, 1);
      var g = c.createRadialGradient(0, 0, 0, 0, 0, ry);
      g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = g; c.beginPath(); c.arc(0, 0, ry, 0, 6.2832); c.fill(); c.restore();
    }
    for (i = 0; i < 26; i++) {
      var px = mwL * (0.06 + 0.88 * (i / 25)) + rand(-30, 30);
      var d = Math.abs(px - ccx) / mwL;
      blob(px, ccy + rand(-1, 1) * mwW * 0.06, rand(mwL * 0.05, mwL * 0.1), mwW * rand(0.22, 0.4) * (1 - d * 0.7), 'rgba(150,160,190,' + rand(0.02, 0.045).toFixed(3) + ')');
    }
    for (i = 0; i < 14; i++) {
      blob(ccx + rand(-mwL * 0.08, mwL * 0.08), ccy + rand(-1, 1) * mwW * 0.08, rand(mwL * 0.03, mwL * 0.07), mwW * rand(0.14, 0.3), 'rgba(232,200,164,' + rand(0.03, 0.06).toFixed(3) + ')');
    }
    for (i = 0; i < 22; i++) {
      blob(ccx + rand(-mwL * 0.28, mwL * 0.3), ccy + rand(-1, 1) * mwW * 0.05, rand(mwL * 0.02, mwL * 0.06), mwW * rand(0.04, 0.1), 'rgba(2,3,6,' + rand(0.1, 0.22).toFixed(3) + ')');
    }
    for (i = 0; i < 2200; i++) {
      var sx = srandom() * mwL;
      var g2 = (srandom() + srandom() + srandom() - 1.5) / 1.5;
      var sy = ccy + g2 * mwW * 0.28;
      var dcore = Math.abs(sx - ccx) / (mwL * 0.5);
      c.globalAlpha = Math.max(0.04, rand(0.08, 0.5) * (1.1 - Math.min(dcore, 1) * 0.55));
      c.fillStyle = srandom() < 0.85 ? '#dfe5f0' : '#f0dfc8';
      var sr = rand(0.4, 1.1) * DPR;
      c.fillRect(sx, sy, sr, sr);
    }
    c.globalAlpha = 1;
    var fx = c.createLinearGradient(0, 0, mwL, 0);
    fx.addColorStop(0, 'rgba(0,0,0,0)'); fx.addColorStop(0.15, 'rgba(0,0,0,1)');
    fx.addColorStop(0.85, 'rgba(0,0,0,1)'); fx.addColorStop(1, 'rgba(0,0,0,0)');
    c.globalCompositeOperation = 'destination-in';
    c.fillStyle = fx; c.fillRect(0, 0, mwL, mwW);
    var fy = c.createLinearGradient(0, 0, 0, mwW);
    fy.addColorStop(0, 'rgba(0,0,0,0)'); fy.addColorStop(0.25, 'rgba(0,0,0,1)');
    fy.addColorStop(0.75, 'rgba(0,0,0,1)'); fy.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = fy; c.fillRect(0, 0, mwL, mwW);
    c.globalCompositeOperation = 'source-over';
  }

  function makeHazeSprite() {
    var w = 640, h = 170, c = document.createElement('canvas');
    c.width = w; c.height = h;
    var x = c.getContext('2d');
    for (var i = 0; i < 42; i++) {
      var px = rand(w * 0.06, w * 0.94);
      var py = h * 0.5 + rand(-1, 1) * rand(0, h * 0.2);
      var pr = rand(18, 58);
      var g = x.createRadialGradient(px, py, 0, px, py, pr);
      var a = rand(0.02, 0.05).toFixed(3);
      g.addColorStop(0, 'rgba(158,156,152,' + a + ')');
      g.addColorStop(1, 'rgba(158,156,152,0)');
      x.fillStyle = g; x.beginPath(); x.arc(px, py, pr, 0, 6.2832); x.fill();
    }
    var fx = x.createLinearGradient(0, 0, w, 0);
    fx.addColorStop(0, 'rgba(0,0,0,0)'); fx.addColorStop(0.2, 'rgba(0,0,0,1)');
    fx.addColorStop(0.8, 'rgba(0,0,0,1)'); fx.addColorStop(1, 'rgba(0,0,0,0)');
    x.globalCompositeOperation = 'destination-in';
    x.fillStyle = fx; x.fillRect(0, 0, w, h);
    var fy = x.createLinearGradient(0, 0, 0, h);
    fy.addColorStop(0, 'rgba(0,0,0,0)'); fy.addColorStop(0.35, 'rgba(0,0,0,1)');
    fy.addColorStop(0.68, 'rgba(0,0,0,1)'); fy.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = fy; x.fillRect(0, 0, w, h);
    x.globalCompositeOperation = 'source-over';
    return c;
  }

  function buildHazes() {
    reseed(161803398); hazes = [];
    if (tier >= 2) return;
    var n = W > 900 ? 3 : 2;
    for (var i = 0; i < n; i++) {
      var cw = rand(0.5, 0.9) * dw;
      hazes.push({
        img: makeHazeSprite(),
        w: cw, h: cw * 0.14,
        x: rand(-0.2, 1) * dw, y: rand(0.05, 0.75) * dh,
        vx: rand(2.5, 6) * (srandom() < 0.5 ? -1 : 1) * DPR,
        ebbSp: rand(0.05, 0.11), ebbPh: rand(0, 6.28),
        alpha: rand(0.4, 0.65)
      });
    }
  }

  function spawnShot() {
    var dir = Math.random() < 0.5 ? 1 : -1;
    var ang = rand(0.35, 0.7);
    var sp = rand(1100, 1700) * DPR;
    shots.push({
      x: rand(0.05, 0.95) * dw, y: rand(0.02, 0.45) * dh,
      vx: Math.cos(ang) * sp * dir, vy: Math.sin(ang) * sp,
      len: rand(120, 220) * DPR, life: rand(0.6, 1), t: 0
    });
  }

  function render(t, dt) {
    if (!sky) return; // size() hasn't succeeded yet (zero-sized viewport)
    var sc = scrollCur * DPR;
    var i, s, k, a, yy;
    var ang = 0, ip = 1, fadeK = 1, ib = 0;
    if (intro) {
      introT += dt;
      var pI = Math.min(introT / INTRO_D, 1);
      var q = Math.min(pI / 0.7, 1); // spin completes early; the blur tail covers the rest
      var decay = Math.pow(2, -13 * q); // expo-out: full speed at frame one, hard decel into a long glide
      ang = THETA * decay * (1 - q);
      ip = Math.max(0, (pI - 0.5) / 0.5); ip = ip * ip * (3 - 2 * ip);
      fadeK = 0.028 + 0.972 * pI * pI * pI * pI; // partial clear: motion-blur trails that tighten as the spin slows
      ib = 1 - pI * pI; // intro brightness boost, eases to 0 so stars land at resting brightness
      if (pI >= 1) { intro = false; ang = 0; ip = 1; fadeK = 1; ib = 0; }
    }
    ctx.globalAlpha = fadeK;
    ctx.drawImage(sky, 0, 0);
    ctx.globalAlpha = 1;
    if (!colEls) {
      var e0 = document.querySelector('[data-sky-color-start]');
      var e1 = document.querySelector('[data-sky-color-end]');
      if (e0 && e1) colEls = [e0, e1];
      else if (document.readyState === 'complete') colEls = [];
    }
    cf = 0;
    if (colEls && colEls.length === 2) {
      var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
      var rA = colEls[0].getBoundingClientRect(), rB = colEls[1].getBoundingClientRect();
      var s0 = rA.top + sy, s1 = rB.top + rB.height * 0.6 + sy;
      cf = Math.max(0, Math.min(1, (sy + H * 0.75 - s0) / Math.max(1, s1 - s0)));
      cf = cf * cf * (1.8 - 0.8 * cf);
    }
    if (cf > 0.01 && tint) { ctx.globalAlpha = Math.min(1, cf * 1.15); ctx.drawImage(tint, 0, 0); }
    ctx.globalAlpha = ip * fadeK;
    ctx.save();
    ctx.translate(dw * 0.3 - panOX * 0.3, dh * 1.45 - (sc + panOY) * 0.55);
    ctx.rotate(-0.5);
    ctx.drawImage(mw, -mwL / 2, -mwW / 2, mwL, mwW);
    ctx.restore();
    if (galaxies.length) {
      ctx.save(); ctx.globalCompositeOperation = 'screen';
      for (i = 0; i < galaxies.length; i++) {
        var ga = galaxies[i];
        var gy = ga.wy - (sc + panOY) * ga.par;
        var gx = (ga.x - panOX * ga.par) % dw; if (gx < 0) gx += dw;
        if (gy > -ga.h * 2 && gy < dh + ga.h * 2) {
          ctx.globalAlpha = ga.alpha * ip * fadeK;
          ctx.translate(gx, gy); ctx.rotate(ga.rot);
          ctx.drawImage(ga.im, -ga.w / 2, -ga.h / 2, ga.w, ga.h);
          ctx.rotate(-ga.rot); ctx.translate(-gx, -gy);
        }
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    for (i = 0; i < stars.length; i++) {
      s = stars[i];
      s.x += s.depth * 0.35 * DPR * dt; if (s.x > dw) s.x -= dw;
      var xx = (s.x - panOX * s.par) % dw; if (xx < 0) xx += dw;
      yy = (s.y - (sc + panOY) * s.par) % dh; if (yy < 0) yy += dh;
      k = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
      a = s.base * (0.62 + 0.38 * k);
      if (s.scin) a *= 0.7 + 0.3 * Math.sin(t * s.sp2 + s.ph2);
      if (intro) {
        var sdx = xx - dw * 0.18, sdy = yy - dh * 0.22;
        var srr = Math.hypot(sdx, sdy), saa = Math.atan2(sdy, sdx) + ang;
        ctx.globalAlpha = Math.min(1, a * (1 + 1.4 * ib));
        ctx.fillStyle = 'rgb(' + s.col + ')';
        ctx.fillRect(dw * 0.18 + Math.cos(saa) * srr - s.r * 0.5, dh * 0.22 + Math.sin(saa) * srr - s.r * 0.5, s.r, s.r);
      } else {
        ctx.globalAlpha = a;
        ctx.fillStyle = 'rgb(' + s.col + ')';
        ctx.fillRect(xx - s.r * 0.5, yy - s.r * 0.5, s.r, s.r);
      }
    }
    for (i = 0; i < bright.length; i++) {
      s = bright[i];
      s.x += s.depth * 0.35 * DPR * dt; if (s.x > dw) s.x -= dw;
      var xx = (s.x - panOX * s.par) % dw; if (xx < 0) xx += dw;
      yy = (s.y - (sc + panOY) * s.par) % dh; if (yy < 0) yy += dh;
      k = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
      a = s.base * (0.66 + 0.34 * k);
      if (s.scin) a *= 0.75 + 0.25 * Math.sin(t * s.sp2 + s.ph2);
      var r = s.r * (0.96 + 0.08 * k);
      if (intro) {
        var bdx = xx - dw * 0.18, bdy = yy - dh * 0.22;
        var brr = Math.hypot(bdx, bdy), baa = Math.atan2(bdy, bdx) + ang;
        var bx2 = dw * 0.18 + Math.cos(baa) * brr, by2 = dh * 0.22 + Math.sin(baa) * brr;
        ctx.globalAlpha = Math.min(1, a * (1 + 0.8 * ib)); ctx.fillStyle = 'rgb(' + s.col + ')';
        ctx.beginPath(); ctx.arc(bx2, by2, r * (1 + 0.25 * ib), 0, 6.2832); ctx.fill();
      } else {
        var g = ctx.createRadialGradient(xx, yy, 0, xx, yy, r * 3);
        g.addColorStop(0, 'rgba(' + s.col + ',' + (a * 0.32).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(' + s.col + ',0)');
        ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(xx, yy, r * 3, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = a; ctx.fillStyle = 'rgb(' + s.col + ')';
        ctx.beginPath(); ctx.arc(xx, yy, r, 0, 6.2832); ctx.fill();
      }
    }
    if (cf > 0.01) {
      for (i = 0; i < colorStars.length; i++) {
        s = colorStars[i];
        var cx = (s.x - panOX * s.par) % dw; if (cx < 0) cx += dw;
        yy = (s.y - (sc + panOY) * s.par) % dh; if (yy < 0) yy += dh;
        k = 0.5 + 0.5 * Math.sin(t * s.sp + s.ph);
        ctx.globalAlpha = s.base * (0.6 + 0.4 * k) * Math.min(1, cf * 1.25);
        ctx.fillStyle = 'rgb(' + s.col + ')';
        ctx.fillRect(cx - s.r * 0.5, yy - s.r * 0.5, s.r, s.r);
      }
    }
    for (i = 0; i < hazes.length; i++) {
      var c = hazes[i];
      c.x += c.vx * dt;
      if (c.vx > 0 && c.x > dw) { c.x = -c.w; c.y = rand(0.05, 0.75) * dh; }
      if (c.vx < 0 && c.x < -c.w) { c.x = dw; c.y = rand(0.05, 0.75) * dh; }
      k = 0.5 + 0.5 * Math.sin(t * c.ebbSp + c.ebbPh);
      var span = dh + c.h;
      yy = (c.y - sc * 0.38) % span; if (yy < 0) yy += span;
      ctx.globalAlpha = c.alpha * (0.06 + 0.94 * k * k) * ip * fadeK;
      ctx.drawImage(c.img, c.x, yy - c.h, c.w, c.h);
    }
    nextShot -= dt;
    if (nextShot <= 0 && shots.length < 2 && dt > 0 && !intro) { spawnShot(); nextShot = rand(5, 12); }
    for (i = shots.length - 1; i >= 0; i--) {
      var sh = shots[i];
      sh.t += dt;
      if (sh.t >= sh.life) { shots.splice(i, 1); continue; }
      var p = sh.t / sh.life;
      var fade = Math.sin(Math.PI * p) * 0.85;
      var hx = sh.x + sh.vx * sh.t, hy = sh.y + sh.vy * sh.t;
      var mag = Math.hypot(sh.vx, sh.vy);
      var tl = sh.len * Math.min(p * 3, 1);
      var tx = hx - sh.vx / mag * tl, ty = hy - sh.vy / mag * tl;
      var lg = ctx.createLinearGradient(hx, hy, tx, ty);
      lg.addColorStop(0, 'rgba(240,244,255,' + fade.toFixed(3) + ')');
      lg.addColorStop(1, 'rgba(240,244,255,0)');
      ctx.globalAlpha = 1;
      ctx.strokeStyle = lg; ctx.lineWidth = 1.2 * DPR; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tx, ty); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function frame(ts) {
    if (!running) return;
    rafId = requestAnimationFrame(frame);
    var t = ts / 1000;
    var dt = tPrev ? Math.min(t - tPrev, 0.05) : 0.016;
    tPrev = t;
    var target = window.pageYOffset || document.documentElement.scrollTop || 0;
    scrollCur += (target - scrollCur) * Math.min(1, dt * 7);
    panVX += (panTX - panVX) * Math.min(1, dt * (Math.abs(panTX) > Math.abs(panVX) ? 7 : 2.4));
    panVY += (panTY - panVY) * Math.min(1, dt * (Math.abs(panTY) > Math.abs(panVY) ? 7 : 2.4));
    panOX += panVX * dt * DPR; panOY += panVY * dt * DPR;
    render(t, dt);
    govern(dt);
  }

  // Measure fps in 2s windows; below 45 -> halve density + drop DPR, then cut haze/colour layers.
  function govern(dt) {
    if (tier >= 2 || intro || document.hidden) return;
    if (gvWait > 0) { gvWait -= dt; return; }
    gvN++; gvT += dt;
    if (gvT < 2) return;
    var fps = gvN / gvT; gvN = 0; gvT = 0;
    if (fps < 45) {
      tier++;
      DPR = 1;
      DENS = baseDens * (tier === 1 ? 0.5 : 0.2);
      size();
      gvWait = 2;
    }
  }

  function size() {
    W = host.clientWidth || window.innerWidth;
    H = host.clientHeight || window.innerHeight;
    if (!W || !H) { setTimeout(size, 200); return; } // hidden/prerendered viewport: retry until real dimensions exist
    dw = Math.round(W * DPR); dh = Math.round(H * DPR);
    cv.width = dw; cv.height = dh;
    buildSky(); buildMilkyWay(); buildTint(); buildStars(); buildGalaxies(); buildHazes();
  }

  window.addEventListener('wm:starDensity', function (e) {
    baseDens = Math.max(0.2, +e.detail || 1);
    DENS = baseDens * (tier === 0 ? 1 : tier === 1 ? 0.5 : 0.2);
    buildStars(); if (reduced) render(1.2, 0);
  });
  size();
  if (reduced) { intro = false; render(1.2, 0); }
  else {
    rafId = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { running = false; cancelAnimationFrame(rafId); }
      else if (!running) { running = true; tPrev = 0; rafId = requestAnimationFrame(frame); }
    });
  }
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { size(); if (reduced) render(1.2, 0); }, 150);
  });
})();

})();
