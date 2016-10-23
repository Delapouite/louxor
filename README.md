# Louxor

> **Je coupe le son… et je remets le son !**  
> *[Louxor J'adore](https://www.youtube.com/watch?v=yUvK5AS8Wmo)*, Philippe Katerine

A web player frontend for [MPD](https://www.musicpd.org).

## Philosophy

Remember the good old times before streaming music services were legions? Yes, when you had to rip all your CDs and keep them on your drive in a well organized library!

The Music Player Daemon was your best friend, endlessly playing your favorite songs from your neatly crafted playlists…

This wonderful era is not dead yet and Louxor embraces it.

Here's how Louxor looks:

![katerine](https://raw.githubusercontent.com/delapouite/louxor/master/docs/katerine.jpg)

There are already a gazillions of good [MPD clients](https://rybczak.net/ncmpcpp/) to do the heavy work in the coziness of your terminal emulator.

So Louxor's focus is on minimalism and design ; it does not aim to be a full featured player, it just loves to shine on a big dedicated screen.

It displays only basic info about the current song and the art cover from the associated album.

## Controls

- Play / Pause
- Random / No Random
- Open a youtube search to attempt finding a music clip
- Previous / Next song (by clicking on each side of the screen, works well with tablets)
- Fullscreen toggle

### Search

Clicking on the artist's name opens all the related albums at the bottom:

![stupeflip](https://raw.githubusercontent.com/delapouite/louxor/master/docs/stupeflip.jpg)

Clicking on the cover will flip the album and display its songs:

![carpenter-brut](https://raw.githubusercontent.com/delapouite/louxor/master/docs/carpenter-brut.jpg)

## Technos

Since a web browser still can't open a TCP socket directly, Louxor acts as a [Node](https://nodejs.org) proxy server. All the requests from the [React](https://facebook.github.io/react/) client are transmitted by websockets and then relayed to MPD, using [mpcpp](https://www.npmjs.com/package/mpcpp).

## Install

`npm i -g louxor`

## Usage

(MPD should be running)

`louxor`

then, open `http://localhost:44190`

or with more control:

`louxor -p 42000 -b`

In this case `-b` opens your default web browser automatically on the port specified by `-p`
